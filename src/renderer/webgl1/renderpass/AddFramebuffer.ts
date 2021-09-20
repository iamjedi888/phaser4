import { FramebufferStack } from './FramebufferStack';
import { FramebufferStackEntry } from './FramebufferStackEntry';
import { IRectangle } from '../../../geom/rectangle/IRectangle';

export function AddFramebuffer <T extends IRectangle> (framebuffer: WebGLFramebuffer, viewport?: T): FramebufferStackEntry
{
    const entry = { framebuffer, viewport };

    FramebufferStack.index++;

    //  cursor already at the end of the stack, so we need to grow it
    if (FramebufferStack.index === FramebufferStack.stack.length)
    {
        FramebufferStack.stack.push(entry);
    }
    else
    {
        FramebufferStack.stack[FramebufferStack.index] = entry;
    }

    return entry;
}
