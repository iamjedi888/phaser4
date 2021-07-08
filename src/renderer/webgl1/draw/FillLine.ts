import { BatchQuad } from './BatchQuad';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';

export function FillLine (renderPass: IRenderPass, x1: number, y1: number, x2: number, y2: number, width: number, red: number, green: number, blue: number, alpha: number): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    const textureIndex = renderPass.textures.setWhite();

    const dx = x2 - x1;
    const dy = y2 - y1;

    const len = Math.sqrt(dx * dx + dy * dy);

    width *= 0.5;

    const al0 = width * (y2 - y1) / len;
    const al1 = width * (x1 - x2) / len;
    const bl0 = width * (y2 - y1) / len;
    const bl1 = width * (x1 - x2) / len;

    BatchQuad(
        F32, offset, textureIndex,
        Math.round(x1 + al0), Math.round(y1 + al1),
        Math.round(x1 - al0), Math.round(y1 - al1),
        Math.round(x2 - bl0), Math.round(y2 - bl1),
        Math.round(x2 + bl0), Math.round(y2 + bl1),
        red, green, blue, alpha
    );
}
