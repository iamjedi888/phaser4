import { Color } from '../components/color/Color';
import { IBaseCamera } from '../camera/IBaseCamera';
import { IColorComponent } from '../components/color/IColorComponent';
import { IGameObject } from '../gameobjects/IGameObject';
import { IRenderPass } from '../renderer/webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';

export interface IBaseWorld extends IGameObject, IColorComponent
{
    scene: IScene;

    camera: IBaseCamera;

    is3D: boolean;

    color: Color;

    children: number[];

    beforeUpdate (delta: number, time: number): void;
    update (delta: number, time: number): void;
    afterUpdate (delta: number, time: number): void;

    preRender (gameFrame: number): boolean;
    renderGL <T extends IRenderPass> (renderPass: T): void;
    postRenderGL <T extends IRenderPass> (renderPass: T): void;

    shutdown (): void;
    destroy (reparentChildren?: IGameObject): void;
}
