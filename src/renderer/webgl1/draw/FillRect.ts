import { BatchQuad } from './BatchQuad';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IRenderPass } from '../renderpass/IRenderPass';

export function FillRect (renderPass: IRenderPass, x: number, y: number, width: number, height: number, red: number, green: number, blue: number, alpha: number): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    const textureIndex = renderPass.textures.setWhite();

    x = Math.round(x);
    y = Math.round(y);

    BatchQuad(
        F32, offset, textureIndex,
        x, y,
        x, y + height,
        x + width, y + height,
        x + width, y,
        red, green, blue, alpha
    );
}
