import * as GameObjectEvents from '../gameobjects/events';
import * as WorldEvents from './events';

import { Begin, Flush } from '../renderer/webgl1/renderpass';
import { Emit, Off, On, Once } from '../events';

import { BuildRenderList } from './BuildRenderList';
import { GameObject } from '../gameobjects';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IBaseWorld } from './IBaseWorld';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IWorldRenderData } from './IWorldRenderData';
import { Mat2dEquals } from '../math/mat2d/Mat2dEquals';
import { MergeRenderData } from './MergeRenderData';
import { RemoveChildren } from '../display';
import { ResetWorldRenderData } from './ResetWorldRenderData';
import { SearchEntry } from '../display/SearchEntryType';
import { WillUpdate } from '../components/permissions';

export class BaseWorld extends GameObject implements IBaseWorld
{
    scene: IScene;

    camera: IBaseCamera;

    renderData: IWorldRenderData;

    forceRefresh: boolean = false;

    is3D: boolean = false;

    renderList: SearchEntry[];

    private _updateListener: IEventInstance;
    private _renderListener: IEventInstance;
    private _shutdownListener: IEventInstance;

    constructor (scene: IScene)
    {
        super();

        this.scene = scene;

        this.world = this;

        this.renderList = [];

        this._updateListener = On(scene, 'update', (delta: number, time: number) => this.update(delta, time));
        this._renderListener = On(scene, 'render', (renderData: ISceneRenderData) => this.render(renderData));
        this._shutdownListener = On(scene, 'shutdown', () => this.shutdown());

        Once(scene, 'destroy', () => this.destroy());
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

    postUpdate (delta: number, time: number): void
    {
        Emit(this, GameObjectEvents.PostUpdateEvent, delta, time, this);
    }

    render (sceneRenderData: ISceneRenderData): void
    {
        const renderData = this.renderData;

        ResetWorldRenderData(renderData, sceneRenderData.gameFrame);

        if (!this.isRenderable())
        {
            return;
        }

        BuildRenderList(this);

        Emit(this, WorldEvents.WorldRenderEvent, renderData, this);

        MergeRenderData(sceneRenderData, renderData);

        this.camera.dirtyRender = false;
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        const currentCamera = renderPass.current2DCamera;
        const camera = this.camera;

        if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform))
        {
            Flush(renderPass);
        }

        Begin(renderPass, camera);

        this.renderList.forEach(entry =>
        {
            if (entry.children.length > 0)
            {
                this.renderNode(entry, renderPass);
            }
            else
            {
                entry.node.renderGL(renderPass);
            }
        });
    }

    renderNode (entry: SearchEntry, renderPass: IRenderPass): void
    {
        entry.node.renderGL(renderPass);

        entry.children.forEach(child =>
        {
            if (child.children.length > 0)
            {
                this.renderNode(child, renderPass);
            }
            else
            {
                child.node.renderGL(renderPass);
            }
        });

        entry.node.postRenderGL(renderPass);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postRenderGL <T extends IRenderPass> (renderPass: T): void
    {
        //  Emit event?
    }

    shutdown (): void
    {
        const scene = this.scene;

        Off(scene, 'update', this._updateListener);
        Off(scene, 'render', this._renderListener);
        Off(scene, 'shutdown', this._shutdownListener);

        //  Clear the display list and reset the camera, but leave
        //  everything in place so we can return to this World again
        //  at a later stage

        RemoveChildren(this);

        Emit(this, WorldEvents.WorldShutdownEvent, this);

        ResetWorldRenderData(this.renderData, 0);

        if (this.camera)
        {
            this.camera.reset();
        }
    }

    destroy (reparentChildren?: IGameObject): void
    {
        super.destroy(reparentChildren);

        ResetWorldRenderData(this.renderData, 0);

        if (this.camera)
        {
            this.camera.destroy();
        }

        this.camera = null;
        this.renderData = null;
    }
}
