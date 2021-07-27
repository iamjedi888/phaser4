import { IRenderPass } from './webgl1/renderpass/IRenderPass';

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
    begin (willRedraw: boolean): void;
    end (): void;
    destroy (): void;
}
