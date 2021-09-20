import { AddFramebuffer } from './AddFramebuffer';
import { BindFramebuffer } from './BindFramebuffer';
import { IRectangle } from '../../../geom/rectangle/IRectangle';

export function SetFramebuffer <T extends IRectangle> (framebuffer: WebGLFramebuffer, clear: boolean = true, viewport?: T): void
{
    const entry = AddFramebuffer(framebuffer, viewport);

    BindFramebuffer(clear, entry);
}
