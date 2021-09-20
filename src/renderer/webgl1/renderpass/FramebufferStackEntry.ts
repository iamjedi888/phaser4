import { IRectangle } from '../../../geom/rectangle/IRectangle';

export type FramebufferStackEntry = {
    framebuffer: WebGLFramebuffer;
    viewport?: IRectangle;
};
