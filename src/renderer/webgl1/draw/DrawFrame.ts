import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IFrame } from '../../../textures/IFrame';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { PackColor } from '../colors/PackColor';

export function DrawFrame (renderPass: IRenderPass, texture: ITexture, frame: string | number | IFrame, x: number, y: number, alpha: number = 1, scaleX: number = 1, scaleY: number = 1): void
{
    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);

    const packedColor = PackColor(0xffffff, alpha);

    frame = texture.getFrame(frame);

    const textureIndex = renderPass.textures.set(texture);

    const displayWidth = frame.width * scaleX;
    const displayHeight = frame.height * scaleY;

    //  top left
    F32[offset + 0] = x;
    F32[offset + 1] = y;
    F32[offset + 2] = frame.u0;
    F32[offset + 3] = frame.v0;
    F32[offset + 4] = textureIndex;
    U32[offset + 5] = packedColor;

    //  bottom left
    F32[offset + 6] = x;
    F32[offset + 7] = y + displayHeight;
    F32[offset + 8] = frame.u0;
    F32[offset + 9] = frame.v1;
    F32[offset + 10] = textureIndex;
    U32[offset + 11] = packedColor;

    //  bottom right
    F32[offset + 12] = x + displayWidth;
    F32[offset + 13] = y + displayHeight;
    F32[offset + 14] = frame.u1;
    F32[offset + 15] = frame.v1;
    F32[offset + 16] = textureIndex;
    U32[offset + 17] = packedColor;

    //  top right
    F32[offset + 18] = x + displayWidth;
    F32[offset + 19] = y;
    F32[offset + 20] = frame.u1;
    F32[offset + 21] = frame.v0;
    F32[offset + 22] = textureIndex;
    U32[offset + 23] = packedColor;
}
