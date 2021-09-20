import { FramebufferStack } from './FramebufferStack';
import { FramebufferStackEntry } from './FramebufferStackEntry';

export function CurrentFramebuffer (): FramebufferStackEntry
{
    return FramebufferStack.stack[FramebufferStack.index];
}
