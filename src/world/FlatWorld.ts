import { BaseWorld } from './BaseWorld';
import { GetRenderList } from './RenderGLNode';
import { IFlatWorld } from './IFlatWorld';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';
import { PreRenderWorld } from './PreRenderWorld';
import { RenderGLWorld } from './RenderGLWorld';
import { RendererInstance } from '../renderer/RendererInstance';
import { WorldCamera } from '../camera/WorldCamera';

//  A Flat World is designed specifically so that none of its children
//  have children of their own. For example, you cannot add a Container
//  to a Flat World. It should be used when you want to render a whole
//  bunch of Sprites.

export class FlatWorld extends BaseWorld implements IFlatWorld
{
    readonly type: string = 'FlatWorld';

    declare camera: WorldCamera;

    constructor (scene: IScene)
    {
        super(scene);

        const renderer = RendererInstance.get();

        this.camera = new WorldCamera(renderer.width, renderer.height);
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
