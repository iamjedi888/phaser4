import { FramebufferStackEntry } from './FramebufferStackEntry';
import { IRenderPass } from './IRenderPass';
export declare type IFramebufferStack = {
    renderPass: IRenderPass;
    stack: FramebufferStackEntry[];
    active: WebGLFramebuffer;
    default: FramebufferStackEntry;
    index: number;
    init: <T extends IRenderPass>(renderPass: T) => void;
};
export declare const FramebufferStack: IFramebufferStack;
//# sourceMappingURL=FramebufferStack.d.ts.map