import { BatchTexturedQuad } from './BatchTexturedQuad';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IFrame } from '../../../textures/IFrame';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { SetTexture } from '../renderpass/SetTexture';

export function DrawQuad <T extends ITexture> (renderPass: IRenderPass, texture: T, frame: string | number | IFrame, x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, alpha: number = 1): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    frame = texture.getFrame(frame);

    const textureIndex = SetTexture(texture);

    BatchTexturedQuad(
        F32, offset, textureIndex,
        x0, y0,
        x1, y1,
        x2, y2,
        x3, y3,
        frame.u0, frame.v0, frame.u1, frame.v1,
        1, 1, 1, alpha
    );
}
