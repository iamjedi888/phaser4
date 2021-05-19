import * as GameObjectEvents from '../gameobjects/events';
import * as World3DEvents from './events';

import { Emit, Off, On, Once } from '../events';

import { BuildRenderList } from './BuildRenderList';
import { GameObject3D } from '../gameobjects3d/GameObject3D';
import { IBaseWorld3D } from './IBaseWorld3D';
import { ICamera3D } from '../camera3d/ICamera3D';
import { IEventInstance } from '../events/IEventInstance';
import { IGameObject3D } from '../gameobjects3d/IGameObject3D';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { ISceneRenderData } from '../scenes/ISceneRenderData';
import { IWorld3DRenderData } from './IWorld3DRenderData';
import { MergeRenderData } from './MergeRenderData';
import { RemoveChildren3D } from '../display3d/RemoveChildren3D';
import { ResetWorld3DRenderData } from './ResetWorld3DRenderData';
import { SearchEntry3D } from '../display3d/SearchEntry3DType';

export class BaseWorld3D extends GameObject3D implements IBaseWorld3D
{
    scene: IScene;

    camera: ICamera3D;
    renderData: IWorld3DRenderData;
    forceRefresh: boolean = false;
    events: Map<string, Set<IEventInstance>>;
    is3D: boolean = true;
    renderList: SearchEntry3D[];

    private _updateListener: IEventInstance;
    private _renderListener: IEventInstance;
    private _shutdownListener: IEventInstance;

    constructor (scene: IScene)
    {
        super();

        this.scene = scene;
        this.world = this;

        this.events = new Map();

        this.renderList = [];

        this._updateListener = On(scene, 'update', (delta: number, time: number) => this.update(delta, time));
        this._renderListener = On(scene, 'render', (renderData: ISceneRenderData) => this.render(renderData));
        this._shutdownListener = On(scene, 'shutdown', () => this.shutdown());
        Once(scene, 'destroy', () => this.destroy());
    }

    update (delta: number, time: number): void
    {
        if (!this.willUpdate)
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

        ResetWorld3DRenderData(renderData, sceneRenderData.gameFrame);

        if (!this.willRender || !this.visible)
        {
            return;
        }

        BuildRenderList(this);

        Emit(this, World3DEvents.World3DRenderEvent, renderData, this);

        MergeRenderData(sceneRenderData, renderData);

        // if (this.camera)
        // {
        //     this.camera.dirtyRender = false;
        // }
    }

    renderNode (entry: SearchEntry3D, renderPass: IRenderPass): void
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

    shutdown (): void
    {
        const scene = this.scene;

        Off(scene, 'update', this._updateListener);
        Off(scene, 'render', this._renderListener);
        Off(scene, 'shutdown', this._shutdownListener);

        //  Clear the display list and reset the camera, but leave
        //  everything in place so we can return to this World again
        //  at a later stage

        RemoveChildren3D(this);

        Emit(this, World3DEvents.World3DShutdownEvent, this);

        ResetWorld3DRenderData(this.renderData, 0);

        // if (this.camera)
        // {
        //     this.camera.reset();
        // }
    }

    destroy (reparentChildren?: IGameObject3D): void
    {
        super.destroy(reparentChildren);

        Emit(this, GameObjectEvents.DestroyEvent, this);

        ResetWorld3DRenderData(this.renderData, 0);

        // if (this.camera)
        // {
        //     this.camera.destroy();
        // }

        this.events.clear();

        this.camera = null;
        this.renderData = null;
        this.events = null;
    }
}
