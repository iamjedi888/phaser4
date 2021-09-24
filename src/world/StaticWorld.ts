import { BaseWorld } from './BaseWorld';
import { GetRenderList } from './RenderGLNode';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticWorld } from './IStaticWorld';
import { PreRenderWorld } from './PreRenderWorld';
import { RenderGLWorld } from './RenderGLWorld';
import { RendererInstance } from '../renderer/RendererInstance';
import { StaticCamera } from '../camera/StaticCamera';
import { UpdateWorld } from './UpdateWorld';

//  A Static World is designed specifically to have a bounds of a fixed size
//  and a camera that doesn't move at all (no moving or scaling)
//  Games that use this kind of world include Pacman, Bejeweled and 2048.

export class StaticWorld extends BaseWorld implements IStaticWorld
{
    readonly type: string = 'StaticWorld';

    declare camera: StaticCamera;

    constructor (scene: IScene)
    {
        super(scene);

        const renderer = RendererInstance.get();

        this.camera = new StaticCamera(renderer.width, renderer.height);
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
