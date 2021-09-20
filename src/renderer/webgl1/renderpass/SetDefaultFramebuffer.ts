import { FramebufferStack } from './FramebufferStack';
import { IRectangle } from '../../../geom/rectangle/IRectangle';

export function SetDefaultFramebuffer <T extends IRectangle> (framebuffer: WebGLFramebuffer = null, viewport?: T): void
{
    const entry = { framebuffer, viewport };

    //  The default entry always goes into index zero
    FramebufferStack.stack[0] = entry;

    FramebufferStack.index = 0;

    FramebufferStack.default = entry;
}
