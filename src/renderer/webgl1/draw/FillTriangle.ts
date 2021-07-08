import { GetRGBArray } from '../colors/GetRGBArray';
import { GetTexture } from '../../../textures/GetTexture';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { PackColor } from '../colors/PackColor';

export function FillTriangle (renderPass: IRenderPass, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color: number, alpha: number = 1): void
{
    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);

    // const packedColor = PackColor(color, alpha);
    const packedColor = GetRGBArray(color);

    const textureIndex = renderPass.textures.set(GetTexture('__WHITE'));

    //  top left
    F32[offset + 0] = x1;
    F32[offset + 1] = y1;
    F32[offset + 2] = 0;
    F32[offset + 3] = 1;
    F32[offset + 4] = textureIndex;
    F32[offset + 5] = packedColor[0];
    F32[offset + 6] = packedColor[1];
    F32[offset + 7] = packedColor[2];
    F32[offset + 8] = packedColor[3];

    //  bottom left
    F32[offset + 9] = x2;
    F32[offset + 10] = y2;
    F32[offset + 11] = 0;
    F32[offset + 12] = 0;
    F32[offset + 13] = textureIndex;
    F32[offset + 14] = packedColor[0];
    F32[offset + 15] = packedColor[1];
    F32[offset + 16] = packedColor[2];
    F32[offset + 17] = packedColor[3];

    //  bottom right
    F32[offset + 18] = x3;
    F32[offset + 19] = y3;
    F32[offset + 20] = 1;
    F32[offset + 21] = 0;
    F32[offset + 22] = textureIndex;
    F32[offset + 23] = packedColor[0];
    F32[offset + 24] = packedColor[1];
    F32[offset + 25] = packedColor[2];
    F32[offset + 26] = packedColor[3];
}
