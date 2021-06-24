import * as WorldEvents from './events';

import { Begin, Flush } from '../renderer/webgl1/renderpass';
import { Changed, Query, defineComponent, defineQuery } from 'bitecs';
import { ClearDirtyDisplayList, HasDirtyChildCache, HasDirtyDisplayList, SetDirtyParents } from '../components/dirty';
import { Emit, Once } from '../events';
import { GameObject, GameObjectCache } from '../gameobjects';
import { WillCacheChildren, WillUpdate } from '../components/permissions';

import { AddRenderDataComponent } from './AddRenderDataComponent';
import { CheckDirtyTransforms } from './CheckDirtyTransforms';
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
import { WorldList } from './WorldList';
import { WorldMatrix2DComponent } from '../components/transform';

export class BaseWorld extends GameObject implements IBaseWorld
{
    tag = defineComponent();

    scene: IScene;

    sceneManager: SceneManager;

    camera: IBaseCamera;

    forceRefresh: boolean = false;

    is3D: boolean = false;

    runRender: boolean = false;

    private renderList: Uint32Array;
    private listLength: number;

    private totalChildren: number;
    private totalChildrenQuery: Query;
    private dirtyWorldQuery: Query;

    constructor (scene: IScene)
    {
        super();

        this.scene = scene;
        this.sceneManager = SceneManagerInstance.get();

        this.totalChildren = 0;
        this.totalChildrenQuery = defineQuery([ this.tag ]);
        this.dirtyWorldQuery = defineQuery([ this.tag, Changed(WorldMatrix2DComponent) ]);

        //  * 4 because each Game Object ID is added twice (render and post render) + each has the render type flag
        this.renderList = new Uint32Array(GetWorldSize() * 4);
        this.listLength = 0;

        const id = this.id;

        AddRenderDataComponent(id);

        SetWorldID(id, id);

        WorldList.get(scene).push(this);

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

    //  Called by RebuildWorldList as it sweeps the world children, looking to see what will render or not

    //  renderType:

    //  0 = render
    //  1 = postRender
    //  2 = render child cache
    //  3 = postRender child cache
    addToRenderList (id: number, renderType: number): void
    {
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
    }

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

        if (dirtyDisplayList)
        {
            this.listLength = 0;

            RebuildWorldList(this, id);

            ClearDirtyDisplayList(id);

            isDirty = true;

            this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
        }

        if (dirtyDisplayList || CheckDirtyTransforms(id, transformList))
        {
            RebuildWorldTransforms(this, id, transformList, false);

            isDirty = true;
        }

        this.camera.dirtyRender = false;

        this.runRender = (this.listLength > 0);

        const dirtyWorld = this.dirtyWorldQuery(GameObjectWorld);

        //  This is a list of all entities with a dirty world transform
        //  We need to go through and tell them to update their parents dirtyChild flags
        for (let i = 0; i < dirtyWorld.length; i++)
        {
            const eid = dirtyWorld[i];

            SetDirtyParents(eid);
        }

        sceneManager.updateWorldStats(this.totalChildren, this.listLength / 4, Number(dirtyDisplayList), dirtyWorld.length);

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
        Emit(this, WorldEvents.WorldRenderEvent, this);

        const currentCamera = renderPass.current2DCamera;
        const camera = this.camera;

        if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform))
        {
            Flush(renderPass);
        }

        Begin(renderPass, camera);

        const list = this.renderList;

        let skip = false;

        for (let i = 0; i < this.listLength; i += 2)
        {
            const eid = list[i];
            const type = list[i + 1];
            const entry = GameObjectCache.get(eid);

            if (type === 2 && !HasDirtyChildCache(eid))
            {
                skip = true;

                entry.renderGL(renderPass);
            }
            else if (type === 3)
            {
                skip = false;

                entry.postRenderGL(renderPass);
            }

            if (skip)
            {
                continue;
            }

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
