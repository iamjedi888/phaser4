import * as GameObjectEvents from '../gameobjects/events';
import * as WorldEvents from './events';

import { Begin, Flush } from '../renderer/webgl1/renderpass';
import { ClearDirtyDisplayList, HasDirtyDisplayList } from '../components/dirty';
import { Emit, Off, On, Once } from '../events';
import { GameObject, GameObjectCache } from '../gameobjects';
import { SceneAfterUpdateEvent, SceneBeforeUpdateEvent, SceneDestroyEvent, ScenePostRenderGLEvent, ScenePreRenderEvent, SceneRenderGLEvent, SceneShutdownEvent, SceneUpdateEvent } from '../scenes/events';

import { AddRenderDataComponent } from './AddRenderDataComponent';
import { AddTransform2DComponent } from '../components/transform/AddTransform2DComponent';
import { CheckDirtyTransforms } from './CheckDirtyTransforms';
import { GetWorldSize } from '../config/worldsize';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IBaseWorld } from './IBaseWorld';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { Mat2dEquals } from '../math/mat2d/Mat2dEquals';
import { RebuildWorldList } from './RebuildWorldList';
import { RebuildWorldTransforms } from './RebuildWorldTransforms';
import { RemoveChildren } from '../display';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SceneManager } from '../scenes/SceneManager';
import { SceneManagerInstance } from '../scenes/SceneManagerInstance';
import { SetWorldID } from '../components/hierarchy';
import { WillUpdate } from '../components/permissions';

export class BaseWorld extends GameObject implements IBaseWorld
{
    scene: IScene;

    sceneManager: SceneManager;

    camera: IBaseCamera;

    forceRefresh: boolean = false;

    is3D: boolean = false;

    renderList: Uint32Array;
    listLength: number;

    private _beforeUpdateListener: IEventInstance;
    private _updateListener: IEventInstance;
    private _afterUpdateListener: IEventInstance;

    private _preRenderListener: IEventInstance;
    private _renderGLListener: IEventInstance;
    private _postRenderGLListener: IEventInstance;

    private _shutdownListener: IEventInstance;

    constructor (scene: IScene)
    {
        super();

        this.scene = scene;
        this.sceneManager = SceneManagerInstance.get();

        //  * 4 because each Game Object ID is added twice (render and post render) + each has the render type flag
        this.renderList = new Uint32Array(GetWorldSize() * 4);
        this.listLength = 0;

        this._beforeUpdateListener = On(scene, SceneBeforeUpdateEvent, (delta: number, time: number) => this.beforeUpdate(delta, time));
        this._updateListener = On(scene, SceneUpdateEvent, (delta: number, time: number) => this.update(delta, time));
        this._afterUpdateListener = On(scene, SceneAfterUpdateEvent, (delta: number, time: number) => this.afterUpdate(delta, time));

        this._preRenderListener = On(scene, ScenePreRenderEvent, (gameFrame: number, transformList: number[]) => this.preRender(gameFrame, transformList));
        this._renderGLListener = On(scene, SceneRenderGLEvent, <T extends IRenderPass> (renderPass: T) => this.renderGL(renderPass));
        this._postRenderGLListener = On(scene, ScenePostRenderGLEvent, <T extends IRenderPass> (renderPass: T) => this.postRenderGL(renderPass));

        this._shutdownListener = On(scene, SceneShutdownEvent, () => this.shutdown());

        const id = this.id;

        AddRenderDataComponent(id);
        AddTransform2DComponent(id);

        SetWorldID(id, id);

        Once(scene, SceneDestroyEvent, () => this.destroy());
    }

    beforeUpdate (delta: number, time: number): void
    {
        Emit(this, GameObjectEvents.BeforeUpdateEvent, delta, time, this);
    }

    update (delta: number, time: number): void
    {
        if (!WillUpdate(this.id))
        {
            return;
        }

        Emit(this, GameObjectEvents.UpdateEvent, delta, time, this);

        super.update(delta, time);
    }

    afterUpdate (delta: number, time: number): void
    {
        Emit(this, GameObjectEvents.AfterUpdateEvent, delta, time, this);
    }

    addToRenderList (id: number, renderType: number): void
    {
        this.renderList[this.listLength] = id;
        this.renderList[this.listLength + 1] = renderType;

        this.listLength += 2;
    }

    preRender (gameFrame: number, transformList: number[]): void
    {
        if (!this.isRenderable())
        {
            return;
        }

        //  Any modification of the display list makes this world dirty ✅
        //  Any modification of any transform for any member of this world, makes it dirty ✅
        //  Any modification of the visibility of a child makes it dirty

        //  When dirty, the renderer needs to be told so it knows not to use the cached version
        //  Otherwise, it doesn't need to re-render

        const id = this.id;

        const dirtyDisplayList = HasDirtyDisplayList(id);

        // ResetWorldRenderData(id, gameFrame);

        if (dirtyDisplayList)
        {
            this.renderList.fill(0);
            this.listLength = 0;

            RebuildWorldList(this, id);

            ClearDirtyDisplayList(id);
        }

        if (dirtyDisplayList || CheckDirtyTransforms(id, transformList))
        {
            RebuildWorldTransforms(this, id, transformList, false);
        }

        //  TODO - Replace
        this.sceneManager.updateRenderData(this, 0, 0, 0);

        this.camera.dirtyRender = false;
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
        Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
    }

    shutdown (): void
    {
        const scene = this.scene;

        Off(scene, SceneBeforeUpdateEvent, this._beforeUpdateListener);
        Off(scene, SceneUpdateEvent, this._updateListener);
        Off(scene, SceneAfterUpdateEvent, this._afterUpdateListener);

        Off(scene, ScenePreRenderEvent, this._preRenderListener);
        Off(scene, SceneRenderGLEvent, this._renderGLListener);
        Off(scene, ScenePostRenderGLEvent, this._postRenderGLListener);

        Off(scene, SceneShutdownEvent, this._shutdownListener);

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
