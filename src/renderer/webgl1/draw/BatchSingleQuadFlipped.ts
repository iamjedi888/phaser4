import { BatchTexturedQuad } from './BatchTexturedQuad';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';

export function BatchSingleQuadFlipped (renderPass: IRenderPass, x: number, y: number, width: number, height: number, u0: number, v0: number, u1: number, v1: number, textureIndex: number = 0): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    BatchTexturedQuad(
        F32, offset, textureIndex,
        x, y + height,
        x, y,
        x + width, y,
        x + width, y + height,
        u0, v0, u1, v1,
        1, 1, 1, 1
    );
}
