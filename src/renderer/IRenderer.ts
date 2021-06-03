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

    initContext (): void;
    resize (width: number, height: number, resolution?: number): void;
    setBackgroundColor (color: number): this;
    render (willRedraw: boolean, scenes: Map<string, IScene>): void;
    destroy (): void;
}
