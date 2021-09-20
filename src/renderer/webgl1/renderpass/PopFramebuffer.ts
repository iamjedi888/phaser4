import { BindFramebuffer } from './BindFramebuffer';
import { CurrentFramebuffer } from './CurrentFramebuffer';
import { FramebufferStack } from './FramebufferStack';

export function PopFramebuffer (): void
{
    if (CurrentFramebuffer().viewport)
    {
        FramebufferStack.renderPass.viewport.pop();
    }

    FramebufferStack.index--;

    BindFramebuffer(false);
}
