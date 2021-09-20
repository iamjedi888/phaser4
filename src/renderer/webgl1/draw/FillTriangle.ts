import { BatchTriangle } from './BatchTriangle';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';
import { SetWhiteTexture } from '../renderpass/SetWhiteTexture';

export function FillTriangle (renderPass: IRenderPass, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, red: number, green: number, blue: number, alpha: number): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 1);

    const textureIndex = SetWhiteTexture();

    BatchTriangle(F32, offset, textureIndex, x1, y1, x2, y2, x3, y3, red, green, blue, alpha);
}
