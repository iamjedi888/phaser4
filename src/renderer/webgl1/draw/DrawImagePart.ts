import { Clamp } from '../../../math';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IFrame } from '../../../textures/IFrame';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { PackColor } from '../colors/PackColor';
import { SetTexture } from '../renderpass/SetTexture';

export function DrawImagePart (renderPass: IRenderPass, texture: ITexture, x0: number, y0: number, x1: number, y1: number, dx: number, dy: number, dw?: number, dh?: number, alpha: number = 1): void
{
    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);

    const packedColor = PackColor(0xffffff, alpha);

    const frame: IFrame = texture.firstFrame;

    const textureIndex = SetTexture(renderPass, texture);

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

    //  top left
    F32[offset + 0] = dx;
    F32[offset + 1] = dy;
    F32[offset + 2] = u0;
    F32[offset + 3] = v0;
    F32[offset + 4] = textureIndex;
    U32[offset + 5] = packedColor;

    //  bottom left
    F32[offset + 6] = dx;
    F32[offset + 7] = dy + dh;
    F32[offset + 8] = u0;
    F32[offset + 9] = v1;
    F32[offset + 10] = textureIndex;
    U32[offset + 11] = packedColor;

    //  bottom right
    F32[offset + 12] = dx + dw;
    F32[offset + 13] = dy + dh;
    F32[offset + 14] = u1;
    F32[offset + 15] = v1;
    F32[offset + 16] = textureIndex;
    U32[offset + 17] = packedColor;

    //  top right
    F32[offset + 18] = dx + dw;
    F32[offset + 19] = dy;
    F32[offset + 20] = u1;
    F32[offset + 21] = v0;
    F32[offset + 22] = textureIndex;
    U32[offset + 23] = packedColor;
}
