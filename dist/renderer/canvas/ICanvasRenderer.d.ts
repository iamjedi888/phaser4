import { IRenderer } from '../IRenderer';
export interface ICanvasRenderer extends IRenderer {
    ctx: CanvasRenderingContext2D;
    clearColor: string;
    reset(): void;
}
//# sourceMappingURL=ICanvasRenderer.d.ts.map