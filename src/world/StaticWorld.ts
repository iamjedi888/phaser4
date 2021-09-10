import { BaseWorld } from './BaseWorld';
import { GetRenderList } from './RenderNode';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { IStaticWorld } from './IStaticWorld';
import { PreRenderWorld } from './PreRenderWorld';
import { RenderGLWorld } from './RenderGLWorld';
import { RendererInstance } from '../renderer/RendererInstance';
import { SetWillCacheChildren } from '../components/permissions/SetWillCacheChildren';
import { SetWillTransformChildren } from '../components/permissions/SetWillTransformChildren';
import { UpdateWorld } from './UpdateWorld';
import { WorldCamera } from '../camera/WorldCamera';

//  A Static World is designed specifically to have a bounds of a fixed size
//  and a camera that doesn't move at all (no scrolling, rotation, etc)
//  Because it has a fixed size, there is no camera culling enabled.
//  Games that use this kind of world include Pacman, Bejeweled and 2048.

export class StaticWorld extends BaseWorld implements IStaticWorld
{
    readonly type: string = 'StaticWorld';

    // declare camera: IStaticCamera;
    declare camera: WorldCamera;

    constructor (scene: IScene)
    {
        super(scene);

        const renderer = RendererInstance.get();

        // this.camera = new StaticCamera(renderer.width, renderer.height);
        this.camera = new WorldCamera(renderer.width, renderer.height);

        SetWillTransformChildren(this.id, false);
        SetWillCacheChildren(this.id, false);
    }

    preRender (gameFrame: number): boolean
    {
        return PreRenderWorld(this, gameFrame);
    }

    update (delta: number, time: number): void
    {
        UpdateWorld(this, delta, time);
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
