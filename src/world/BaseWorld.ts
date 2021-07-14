import * as WorldEvents from './events';

import { Begin, Flush } from '../renderer/webgl1/renderpass';
import { Changed, Query, defineComponent, defineQuery } from 'bitecs';
import { ClearDirtyDisplayList, HasDirtyChildCache, HasDirtyDisplayList, SetDirtyParents } from '../components/dirty';
import { Emit, Once } from '../events';
import { Extent2DComponent, WorldMatrix2DComponent } from '../components/transform';
import { GameObject, GameObjectCache } from '../gameobjects';

import { AddRenderDataComponent } from './AddRenderDataComponent';
import { BoundsIntersects } from '../components/bounds/BoundsIntersects';
import { CheckDirtyTransforms } from './CheckDirtyTransforms';
import { Color } from '../components/color/Color';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetWorldSize } from '../config/worldsize';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IBaseWorld } from './IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { Mat2dEquals } from '../math/mat2d/Mat2dEquals';
import { RebuildWorldList } from './RebuildWorldList';
import { RebuildWorldTransforms } from './RebuildWorldTransforms';
import { RemoveChildren } from '../display';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SceneDestroyEvent } from '../scenes/events';
import { SceneManager } from '../scenes/SceneManager';
import { SceneManagerInstance } from '../scenes/SceneManagerInstance';
import { SetWorldID } from '../components/hierarchy';
import { UpdateVertexPositionSystem } from '../components/vertices/UpdateVertexPositionSystem';
import { WillUpdate } from '../components/permissions';
import { WorldList } from './WorldList';

export class BaseWorld extends GameObject implements IBaseWorld
{
    tag = defineComponent();

    scene: IScene;

    sceneManager: SceneManager;

    camera: IBaseCamera;

    forceRefresh: boolean = false;

    is3D: boolean = false;

    runRender: boolean = false;

    color: Color;

    private renderList: Uint32Array;
    private listLength: number = 0;

    private totalChildren: number = 0;
    private totalChildrenQuery: Query;
    private dirtyWorldQuery: Query;

    private vertexPositionQuery: Query;

    constructor (scene: IScene)
    {
        super();

        this.scene = scene;
        this.sceneManager = SceneManagerInstance.get();

        this.totalChildrenQuery = defineQuery([ this.tag ]);
        this.dirtyWorldQuery = defineQuery([ this.tag, Changed(WorldMatrix2DComponent) ]);
        this.vertexPositionQuery = defineQuery([ this.tag, Changed(WorldMatrix2DComponent), Changed(Extent2DComponent) ]);

        //  * 4 because each Game Object ID is added twice (render and post render) + each has the render type flag
        this.renderList = new Uint32Array(GetWorldSize() * 4);

        const id = this.id;

        AddRenderDataComponent(id);

        SetWorldID(id, id);

        WorldList.get(scene).push(this);

        this.color = new Color(id);

        Once(scene, SceneDestroyEvent, () => this.destroy());
    }

    beforeUpdate (delta: number, time: number): void
    {
        Emit(this, WorldEvents.WorldBeforeUpdateEvent, delta, time, this);
    }

    update (delta: number, time: number): void
    {
        if (!WillUpdate(this.id))
        {
            return;
        }

        Emit(this, WorldEvents.WorldUpdateEvent, delta, time, this);

        super.update(delta, time);
    }

    afterUpdate (delta: number, time: number): void
    {
        Emit(this, WorldEvents.WorldAfterUpdateEvent, delta, time, this);
    }

    //  Here we can check if the entity SHOULD be added to the render list, or not.
    //  Return true to add it to the render list, or return false to skip it AND all its children
    checkWorldEntity (id: number): boolean
    {
        //  TODO - Needs to use the World Bounds of course :)
        //  But for testing, this is fine for now.
        return BoundsIntersects(id, 0, 0, 800, 600);
    }

    //  Called by RebuildWorldList as it sweeps the world children, looking to see what will render or not

    //  renderType:

    //  0 = render
    //  1 = postRender
    addToRenderList (id: number, renderType: number): boolean
    {
        if (renderType === 0 && !this.checkWorldEntity(id))
        {
            //  This entity and its children was NOT added to the render list
            return false;
        }

        let len = this.listLength;
        const list = this.renderList;

        list[len] = id;
        list[len + 1] = renderType;

        this.listLength += 2;

        len += 2;

        if (len === list.length)
        {
            const newList = new Uint32Array(len + (GetWorldSize() * 4));

            newList.set(list, 0);

            this.renderList = newList;
        }

        //  This entity WAS added to the render list
        return true;
    }

    //  TODO - This isn't used internally - is used by debug panel - move out?
    getRenderList (): IGameObject[]
    {
        const list = this.renderList;

        const output = [];

        for (let i = 0; i < this.listLength; i += 2)
        {
            const eid = list[i];
            const type = list[i + 1];

            if (type === 0)
            {
                output.push(GameObjectCache.get(eid));
            }
        }

        return output;
    }

    preRender (gameFrame: number, transformList: number[]): boolean
    {
        const sceneManager = this.sceneManager;

        if (!this.isRenderable())
        {
            this.runRender = false;

            sceneManager.updateWorldStats(this.totalChildren, 0, 0, 0);

            return false;
        }

        const id = this.id;

        const dirtyDisplayList = HasDirtyDisplayList(id);

        ResetWorldRenderData(id, gameFrame);

        let isDirty = false;

        //  Run the World Transform Update first, then Vertex Positions, finally the Render List

        if (dirtyDisplayList || CheckDirtyTransforms(id, transformList))
        {
            //  TODO - This should only run over the branches that are dirty, not the whole World
            RebuildWorldTransforms(this, id, transformList, false);

            isDirty = true;
        }

        //  Update all vertices across this World, ready for render list checking
        //  This will only update entities that had their WorldTransform actually changed

        UpdateVertexPositionSystem(GameObjectWorld, this.vertexPositionQuery);

        //  TODO - We need to update the world bounds, factoring in all children

        //  We now have accurate World Bounds for all children of this World, so let's build the render list

        if (dirtyDisplayList)
        {
            this.listLength = 0;

            //  This will call addToRenderList, which in turn will call checkWorldEntity
            //  As long as this function, which the user can override, returns 'true',
            //  the entity will be added to the render list
            RebuildWorldList(this, id, 0);

            ClearDirtyDisplayList(id);

            isDirty = true;

            this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
        }

        //  TODO - Send total verts to RenderStats component
        // RenderStatsComponent.numDirtyVertices[this.id] = updatedEntities.length * 4;

        this.runRender = (this.listLength > 0);

        const dirtyWorld = this.dirtyWorldQuery(GameObjectWorld).length;

        sceneManager.updateWorldStats(this.totalChildren, this.listLength / 4, Number(dirtyDisplayList), dirtyWorld);

        return isDirty;
    }

    getTotalChildren (): number
    {
        if (HasDirtyDisplayList(this.id))
        {
            this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
        }

        return this.totalChildren;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const color = this.color;

        if (color.colorMatrixEnabled && color.willColorChildren)
        {
            renderPass.colorMatrix.set(color);
        }

        Emit(this, WorldEvents.WorldRenderEvent, this);

        const camera = renderPass.current2DCamera;

        // const camera = this.camera;

        // if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform))
        // {
        //     Flush(renderPass);
        // }

        Begin(renderPass, camera);

        const list = this.renderList;

        for (let i = 0; i < this.listLength; i += 2)
        {
            const eid = list[i];
            const type = list[i + 1];
            const entry = GameObjectCache.get(eid);

            if (type === 1)
            {
                entry.postRenderGL(renderPass);
            }
            else
            {
                entry.renderGL(renderPass);
            }
        }
    }

    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        const color = this.color;

        if (color.colorMatrixEnabled && color.willColorChildren)
        {
            renderPass.colorMatrix.pop();
        }

        if (!this.runRender)
        {
            Begin(renderPass, this.camera);
        }

        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }

    shutdown (): void
    {
        //  Clear the display list and reset the camera, but leave
        //  everything in place so we can return to this World again
        //  at a later stage

        RemoveChildren(this);

        Emit(this, WorldEvents.WorldShutdownEvent, this);

        ResetWorldRenderData(this.id, 0);

        if (this.camera)
        {
            this.camera.reset();
        }
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        this.shutdown();

        if (this.camera)
        {
            this.camera.destroy();
        }

        this.camera = null;
    }
}
