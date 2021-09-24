import { BaseWorld } from './BaseWorld';
import { GetRenderList } from './RenderGLNode';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IWorld } from './IWorld';
import { PreRenderWorld } from './PreRenderWorld';
import { RenderGLWorld } from './RenderGLWorld';
import { RendererInstance } from '../renderer/RendererInstance';
import { UpdateWorld } from './UpdateWorld';
import { WorldCamera } from '../camera/WorldCamera';

export class World extends BaseWorld implements IWorld
{
    readonly type: string = 'World';

    declare camera: WorldCamera;

    constructor (scene: IScene)
    {
        super(scene);

        const renderer = RendererInstance.get();

        this.camera = new WorldCamera(renderer.width, renderer.height);
    }

    //  Called after Scene.update.
    //  Invokes 'update' on all children of the Scene.
    update (delta: number, time: number): void
    {
        this.camera.preRender();

        UpdateWorld(this, delta, time);
    }

    preRender (gameFrame: number): boolean
    {
        return PreRenderWorld(this, gameFrame);
    }

    renderGL <T extends IRenderPass> (renderPass: T): void
    {
        RenderGLWorld(this, renderPass);
    }

    getRenderList (): IGameObject[]
    {
        return GetRenderList();
    }
}
