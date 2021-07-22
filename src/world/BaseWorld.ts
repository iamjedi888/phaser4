import * as WorldEvents from './events';

import { Changed, Query, defineComponent, defineQuery } from 'bitecs';
import { ClearDirtyDisplayList, HasDirtyChild, HasDirtyDisplayList } from '../components/dirty';
import { Emit, Once } from '../events';
import { Extent2DComponent, Transform2DComponent, UpdateExtent, UpdateLocalTransform2DSystem, WorldMatrix2DComponent } from '../components/transform';
import { GameObject, GameObjectCache } from '../gameobjects';

import { AddRenderDataComponent } from './AddRenderDataComponent';
import { Begin } from '../renderer/webgl1/renderpass';
import { BoundsComponent } from '../components/bounds';
import { CalculateWorldBounds } from './CalculateWorldBounds';
import { ClearDirtyChild } from '../components/dirty/ClearDirtyChild';
import { Color } from '../components/color/Color';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetWorldSize } from '../config/worldsize';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IBaseWorld } from './IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { RebuildWorldList } from './RebuildWorldList';
import { RebuildWorldTransforms } from './RebuildWorldTransforms';
import { RemoveChildren } from '../display';
import { RenderStatsComponent } from '../scenes';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SceneDestroyEvent } from '../scenes/events';
import { SceneManager } from '../scenes/SceneManager';
import { SceneManagerInstance } from '../scenes/SceneManagerInstance';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { SetWorldID } from '../components/hierarchy';
import { SpatialHashGrid } from '../math/spatialgrid/SpatialHashGrid';
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

    renderList: Uint32Array;
    listLength: number = 0;

    spatialGrid: SpatialHashGrid;

    private totalChildren: number = 0;

    private totalChildrenQuery: Query;
    private dirtyLocalQuery: Query;
    private vertexPositionQuery: Query;
    // private dirtyBoundsQuery: Query;

    constructor (scene: IScene)
    {
        super();

        this.scene = scene;
        this.sceneManager = SceneManagerInstance.get();

        const tag = this.tag;

        this.totalChildrenQuery = defineQuery([ tag ]);
        this.dirtyLocalQuery = defineQuery([ tag, Changed(Transform2DComponent) ]);
        this.vertexPositionQuery = defineQuery([ tag, Changed(WorldMatrix2DComponent), Changed(Extent2DComponent) ]);
        // this.dirtyBoundsQuery = defineQuery([ tag, Changed(BoundsComponent) ]);

        //  * 4 because each Game Object ID is added twice (render and post render) + each has the render type flag
        this.renderList = new Uint32Array(GetWorldSize() * 4);

        const id = this.id;

        AddRenderDataComponent(id);

        SetWorldID(id, id);

        WorldList.get(scene).push(this);

        this.color = new Color(id);

        this.spatialGrid = new SpatialHashGrid(-1600, -1200, 1600, 1200, 400, 400);

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkWorldEntity (id: number): boolean
    {
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

    preRender (gameFrame: number): boolean
    {
        const id = this.id;

        ClearDirtyChild(id);

        const sceneManager = this.sceneManager;

        if (!this.isRenderable())
        {
            this.runRender = false;

            sceneManager.updateWorldStats(this.totalChildren, 0, 0, 0);

            return false;
        }

        //  Process all dirty 2D transforms and update their local matrix
        //  Also if there are any dirty objects, it flags this World as being dirty
        const dirtyLocalTotal = UpdateLocalTransform2DSystem(GameObjectWorld, this.dirtyLocalQuery);

        RenderStatsComponent.numWorlds[sceneManager.id]++;
        RenderStatsComponent.numDirtyLocalTransforms[sceneManager.id] += dirtyLocalTotal;

        const dirtyDisplayList = HasDirtyDisplayList(id);

        ResetWorldRenderData(id, gameFrame);

        let isDirty = false;

        if (dirtyDisplayList || HasDirtyChild(id))
        {
            //  TODO - This should only run over the branches that are dirty, not the whole World
            RebuildWorldTransforms(this, id, false);

            isDirty = true;
        }

        //  Update all vertices and bounds across this World, ready for render list checking
        //  This will only update entities that had their WorldTransform actually changed
        //  We cannot control the order of these entities, children may be updated before parents, etc

        const updatedEntities = UpdateVertexPositionSystem(GameObjectWorld, this.vertexPositionQuery);

        const dirtyWorldTotal = updatedEntities.length;

        updatedEntities.forEach(entity =>
        {
            this.spatialGrid.insert(entity);
        });

        // const dirtyBoundsTotal = CalculateWorldBounds(GameObjectWorld, this.dirtyBoundsQuery);

        //  We now have accurate World Bounds for all children of this World, so let's build the render list

        if (dirtyDisplayList)
        {
            this.listLength = 0;

            //  This will call AddToRenderList, which in turn will call World.checkWorldEntity
            //  As long as this function, which the user can override, returns 'true',
            //  the entity will be added to the render list
            RebuildWorldList(this, id, 0);

            ClearDirtyDisplayList(id);

            isDirty = true;

            this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
        }

        this.runRender = (this.listLength > 0);

        sceneManager.updateWorldStats(this.totalChildren, this.listLength / 4, Number(dirtyDisplayList), dirtyWorldTotal);

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
        SetColor(renderPass, this.color);

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
        PopColor(renderPass, this.color);

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
