import { GetTexture } from '../../../textures/GetTexture';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { PackColor } from '../colors/PackColor';

export function FillLine (renderPass: IRenderPass, x0: number, y0: number, x1: number, y1: number, width: number, color: number, alpha: number = 1): void
{
    const { F32, U32, offset } = GetVertexBufferEntry(renderPass, 1);

    const packedColor = PackColor(color, alpha);

    const textureIndex = renderPass.textures.set(GetTexture('__WHITE'));

    const dx = x1 - x0;
    const dy = y1 - y0;

    const len = Math.sqrt(dx * dx + dy * dy);

    const al0 = width * (y1 - y0) / len;
    const al1 = width * (x0 - x1) / len;
    const bl0 = width * (y1 - y0) / len;
    const bl1 = width * (x0 - x1) / len;

    F32[offset + 0] = x0 + al0;
    F32[offset + 1] = y0 + al1;
    F32[offset + 2] = 0;
    F32[offset + 3] = 1;
    F32[offset + 4] = textureIndex;
    U32[offset + 5] = packedColor;

    F32[offset + 6] = x0 - al0;
    F32[offset + 7] = y0 - al1;
    F32[offset + 8] = 0;
    F32[offset + 9] = 0;
    F32[offset + 10] = textureIndex;
    U32[offset + 11] = packedColor;

    F32[offset + 12] = x1 - bl0;
    F32[offset + 13] = y1 - bl1;
    F32[offset + 14] = 1;
    F32[offset + 15] = 0;
    F32[offset + 16] = textureIndex;
    U32[offset + 17] = packedColor;

    F32[offset + 18] = x1 + bl0;
    F32[offset + 19] = y1 + bl1;
    F32[offset + 20] = 1;
    F32[offset + 21] = 1;
    F32[offset + 22] = textureIndex;
    U32[offset + 23] = packedColor;
}
