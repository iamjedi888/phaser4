import { ICompressedTextures } from './textures/ICompressedTextures';
import { IRenderPass } from './renderpass/IRenderPass';
export declare class WebGLRenderer {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    renderPass: IRenderPass;
    clearColor: number[];
    width: number;
    height: number;
    resolution: number;
    clearBeforeRender: boolean;
    optimizeRedraw: boolean;
    autoResize: boolean;
    contextLost: boolean;
    compression: ICompressedTextures;
    constructor();
    initContext(): void;
    resize(width: number, height: number, resolution?: number): void;
    onContextLost(event: Event): void;
    onContextRestored(): void;
    setBackgroundColor(color: number): this;
    reset(): void;
    begin(willRedraw: boolean): IRenderPass;
    end(): void;
    destroy(): void;
}
//# sourceMappingURL=WebGLRenderer.d.ts.map