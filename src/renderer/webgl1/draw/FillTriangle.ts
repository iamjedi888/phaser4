import { GetTexture } from '../../../textures/GetTexture';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { PackColor } from '../colors/PackColor';
import { SetTexture } from '../renderpass/SetTexture';

export function FillTriangle (renderPass: IRenderPass, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number, alpha: number = 1): void
{
    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);

    const packedColor = PackColor(color, alpha);

    const textureIndex = SetTexture(renderPass, GetTexture('__WHITE'));

    //  top left
    F32[offset + 0] = x1;
    F32[offset + 1] = y1;
    F32[offset + 2] = 0;
    F32[offset + 3] = 1;
    F32[offset + 4] = textureIndex;
    U32[offset + 5] = packedColor;

    //  bottom left
    F32[offset + 6] = x2;
    F32[offset + 7] = y2;
    F32[offset + 8] = 0;
    F32[offset + 9] = 0;
    F32[offset + 10] = textureIndex;
    U32[offset + 11] = packedColor;

    //  bottom right
    F32[offset + 12] = x3;
    F32[offset + 13] = y3;
    F32[offset + 14] = 1;
    F32[offset + 15] = 0;
    F32[offset + 16] = textureIndex;
    U32[offset + 17] = packedColor;
}
