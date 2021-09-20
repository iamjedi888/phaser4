import { CurrentFramebuffer } from './CurrentFramebuffer';
import { FramebufferStack } from './FramebufferStack';
import { FramebufferStackEntry } from './FramebufferStackEntry';
import { SetViewport } from './SetViewport';
import { gl } from '../GL';

export function BindFramebuffer (clear: boolean = true, entry?: FramebufferStackEntry): void
{
    if (!entry)
    {
        entry = CurrentFramebuffer();
    }

    const { framebuffer, viewport } = entry;

    if (FramebufferStack.active !== framebuffer)
    {
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    }

    if (clear)
    {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    if (viewport)
    {
        SetViewport(viewport.x, viewport.y, viewport.width, viewport.height);
    }

    FramebufferStack.active = framebuffer;
}
