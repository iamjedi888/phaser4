import { BatchTexturedQuad } from './BatchTexturedQuad';
import { Clamp } from '../../../math/Clamp';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IFrame } from '../../../textures/IFrame';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';

export function DrawImagePart <T extends ITexture> (renderPass: IRenderPass, texture: T, x0: number, y0: number, x1: number, y1: number, dx: number, dy: number, dw?: number, dh?: number, alpha: number = 1): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    const frame: IFrame = texture.firstFrame;

    const textureIndex = renderPass.textures.set(texture);

    const frameWidth = frame.width;
    const frameHeight = frame.height;

    //  Keep the coordinates in bounds
    x0 = Clamp(x0, 0, frameWidth);
    x1 = Clamp(x1, x0, frameWidth);
    y0 = Clamp(y0, 0, frameHeight);
    y1 = Clamp(y1, y0, frameHeight);

    const uRange = frame.u1 - frame.u0;
    const vRange = frame.v1 - frame.v0;

    const u0 = frame.u0 + (uRange * (x0 / frameWidth));
    const v0 = frame.v0 + (vRange * (y0 / frameHeight));
    const u1 = frame.u0 + (uRange * (x1 / frameWidth));
    const v1 = frame.v0 + (vRange * (y1 / frameHeight));

    if (dw === undefined || dw === null)
    {
        dw = x1 - x0;
    }

    if (dh === undefined || dh === null)
    {
        dh = y1 - y0;
    }

    BatchTexturedQuad(
        F32, offset, textureIndex,
        dx, dy,
        dx, dy + dh,
        dx + dw, dy + dh,
        dx + dw, dy,
        u0, v0, u1, v1,
        1, 1, 1, alpha
    );
}
