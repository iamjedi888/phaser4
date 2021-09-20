import { FramebufferStackEntry } from './FramebufferStackEntry';
import { IRenderPass } from './IRenderPass';

export type IFramebufferStack =
{
    renderPass: IRenderPass;
    stack: FramebufferStackEntry[];
    active: WebGLFramebuffer;
    default: FramebufferStackEntry;
    index: number;
    init: <T extends IRenderPass> (renderPass: T) => void;
};

export const FramebufferStack: IFramebufferStack =
{
    renderPass: null,
    stack: [],
    active: null,
    default: null,
    index: 0,

    init: <T extends IRenderPass> (renderPass: T): void =>
    {
        FramebufferStack.renderPass = renderPass;
    }
};
