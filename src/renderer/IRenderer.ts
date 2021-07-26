import { IRenderPass } from './webgl1/renderpass/IRenderPass';
import { IScene } from '../scenes/IScene';

export interface IRenderer
{
    canvas: HTMLCanvasElement;

    width: number;
    height: number;
    resolution: number;

    clearBeforeRender: boolean;
    optimizeRedraw: boolean;
    autoResize: boolean;

    renderPass?: IRenderPass;

    initContext (): void;
    resize (width: number, height: number, resolution?: number): void;
    setBackgroundColor (color: number): this;
    renderBegin (willRedraw: boolean): void;
    renderScenes (scenes: Map<string, IScene>): void;
    renderEnd (): void;
    destroy (): void;
}
