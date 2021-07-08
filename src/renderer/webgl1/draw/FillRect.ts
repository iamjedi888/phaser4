import { BatchQuad } from './BatchQuad';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';

export function FillRect (renderPass: IRenderPass, x: number, y: number, width: number, height: number, red: number, green: number, blue: number, alpha: number): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    const textureIndex = renderPass.textures.setWhite();

    BatchQuad(
        F32, offset, textureIndex,
        x, y,
        x, y + height,
        x + width, y + height,
        x + width, y,
        red, green, blue, alpha
    );

    // //  top left
    // F32[offset + 0] = x;
    // F32[offset + 1] = y;
    // F32[offset + 2] = 0;
    // F32[offset + 3] = 1;
    // F32[offset + 4] = textureIndex;
    // U32[offset + 5] = packedColor;

    // //  bottom left
    // F32[offset + 6] = x;
    // F32[offset + 7] = y + height;
    // F32[offset + 8] = 0;
    // F32[offset + 9] = 0;
    // F32[offset + 10] = textureIndex;
    // U32[offset + 11] = packedColor;

    // //  bottom right
    // F32[offset + 12] = x + width;
    // F32[offset + 13] = y + height;
    // F32[offset + 14] = 1;
    // F32[offset + 15] = 0;
    // F32[offset + 16] = textureIndex;
    // U32[offset + 17] = packedColor;

    // //  top right
    // F32[offset + 18] = x + width;
    // F32[offset + 19] = y;
    // F32[offset + 20] = 1;
    // F32[offset + 21] = 1;
    // F32[offset + 22] = textureIndex;
    // U32[offset + 23] = packedColor;
}
