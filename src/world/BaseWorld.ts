import * as WorldEvents from './events';

import { Changed, Query, defineComponent, defineQuery } from 'bitecs';

import { AddRenderDataComponent } from './AddRenderDataComponent';
import { Begin } from '../renderer/webgl1/renderpass/Begin';
import { ClearDirtyChild } from '../components/dirty/ClearDirtyChild';
import { ClearDirtyDisplayList } from '../components/dirty/ClearDirtyDisplayList';
import { Color } from '../components/color/Color';
import { Emit } from '../events/Emit';
import { GameObject } from '../gameobjects/GameObject';
import { GameObjectCache } from '../gameobjects/GameObjectCache';
import { GameObjectWorld } from '../GameObjectWorld';
import { GetWorldSize } from '../config/worldsize/GetWorldSize';
import { HasDirtyChild } from '../components/dirty/HasDirtyChild';
import { HasDirtyDisplayList } from '../components/dirty/HasDirtyDisplayList';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IBaseWorld } from './IBaseWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { Once } from '../events/Once';
import { PopColor } from '../renderer/webgl1/renderpass/PopColor';
import { RebuildWorldList } from './RebuildWorldList';
import { RebuildWorldTransforms } from './RebuildWorldTransforms';
import { RemoveChildren } from '../display/RemoveChildren';
import { RenderDataComponent } from './RenderDataComponent';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SceneDestroyEvent } from '../scenes/events/SceneDestroyEvent';
import { SetColor } from '../renderer/webgl1/renderpass/SetColor';
import { SetWorldID } from '../components/hierarchy/SetWorldID';
import { Transform2DComponent } from '../components/transform/Transform2DComponent';
import { UpdateLocalTransform2DSystem } from '../components/transform/UpdateLocalTransform2DSystem';
import { UpdateVertexPositionSystem } from '../components/vertices/UpdateVertexPositionSystem';
import { WillUpdate } from '../components/permissions/WillUpdate';
import { WorldList } from './WorldList';

export class BaseWorld extends GameObject implements IBaseWorld
{
    readonly type: string = 'BaseWorld';

    tag = defineComponent();

    scene: IScene;

    camera: IBaseCamera;

    is3D: boolean = false;

    color: Color;

    renderList: Uint32Array;
    listLength: number = 0;

    private totalChildren: number = 0;

    private totalChildrenQuery: Query;
    private transformQuery: Query;

    constructor (scene: IScene)
    {
        super();

        const id = this.id;
        const tag = this.tag;

        this.scene = scene;

        this.totalChildrenQuery = defineQuery([ tag ]);
        // this.transformQuery = defineQuery([ tag, Transform2DComponent ]);

        //  The above is MUCH faster! Wait for new bitecs test version.
        this.transformQuery = defineQuery([ tag, Changed(Transform2DComponent) ]);

        //  * 4 because each Game Object ID is added twice (render and post render) + each has the render type flag
        this.renderList = new Uint32Array(GetWorldSize() * 4);

        AddRenderDataComponent(id);

        SetWorldID(id, id);

        WorldList.get(scene).push(this);

        this.color = new Color(id);

        Once(scene, SceneDestroyEvent, () => this.destroy());
    }

    getNumChildren (): number
    {
        if (HasDirtyDisplayList(this.id))
        {
            this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
        }

        return this.totalChildren;
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

    //  We should update the display list and world transforms regardless of
    //  if this World will render or not (i.e. all children are outside viewport)
    preRender (gameFrame: number): boolean
    {
        const id = this.id;

        ResetWorldRenderData(id, gameFrame);

        RenderDataComponent.rebuiltList[id] = 0;
        RenderDataComponent.rebuiltWorld[id] = 0;

        ClearDirtyChild(id);

        UpdateLocalTransform2DSystem(id, GameObjectWorld, this.transformQuery);

        const dirtyDisplayList = HasDirtyDisplayList(id);

        let isDirty = false;

        if (dirtyDisplayList || HasDirtyChild(id))
        {
            //  TODO - This should only run over the branches that are dirty, not the whole World.

            //  This will update the Transform2DComponent.world values.
            RebuildWorldTransforms(this, id, false);

            RenderDataComponent.rebuiltWorld[id] = 1;

            isDirty = true;
        }

        UpdateVertexPositionSystem(id, GameObjectWorld, this.transformQuery);

        if (dirtyDisplayList)
        {
            this.listLength = 0;

            RebuildWorldList(this, id, 0);

            RenderDataComponent.numChildren[id] = this.getNumChildren();
            RenderDataComponent.numRenderable[id] = this.listLength / 4;
            RenderDataComponent.rebuiltList[id] = 1;

            ClearDirtyDisplayList(id);

            isDirty = true;
        }

        //  By this point we've got a fully rebuilt World, where all dirty Game Objects have been
        //  refreshed and had their coordinates moved to their quad vertices.

        //  We've also got a complete local render list, in display order, that can be processed further
        //  before rendering (i.e. spatial tree, bounds, etc)

        return isDirty;
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

        PopColor(renderPass, this.color);

        const id = this.id;

        window['renderStats'] = {
            gameFrame: RenderDataComponent.gameFrame[id],
            numChildren: RenderDataComponent.numChildren[id],
            numRenderable: RenderDataComponent.numRenderable[id],
            dirtyLocal: RenderDataComponent.dirtyLocal[id],
            dirtyVertices: RenderDataComponent.dirtyVertices[id],
            rebuiltList: RenderDataComponent.rebuiltList[id],
            rebuiltWorld: RenderDataComponent.rebuiltWorld[id]
        };

        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }

    shutdown (): void
    {
        RemoveChildren(this);

        Emit(this, WorldEvents.WorldShutdownEvent, this);
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
