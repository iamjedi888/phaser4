import { IRenderPass } from './renderpass/IRenderPass';
import { IRenderer } from '../IRenderer';
export interface IWebGLRenderer extends IRenderer {
    gl: WebGLRenderingContext;
    renderPass: IRenderPass;
    contextLost: boolean;
    onContextLost(event: Event): void;
    onContextRestored(): void;
    reset(): void;
}
//# sourceMappingURL=IWebGLRenderer.d.ts.map