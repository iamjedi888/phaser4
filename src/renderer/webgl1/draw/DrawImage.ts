import { BatchTexturedQuad } from './BatchTexturedQuad';
import { GetVertexBufferEntry } from '../renderpass/GetVertexBufferEntry';
import { IFrame } from '../../../textures/IFrame';
import { IRenderPass } from '../renderpass/IRenderPass';
import { ITexture } from '../../../textures/ITexture';
import { SetWebGLTexture } from '../renderpass/SetWebGLTexture';

export function DrawImage <T extends ITexture> (renderPass: IRenderPass, texture: T, x: number, y: number, alpha: number = 1, scaleX: number = 1, scaleY: number = 1): void
{
    const { F32, offset } = GetVertexBufferEntry(renderPass, 2);

    const frame: IFrame = texture.firstFrame;

    const textureIndex = SetWebGLTexture(texture);

    const displayWidth = frame.width * scaleX;
    const displayHeight = frame.height * scaleY;

    BatchTexturedQuad(
        F32, offset, textureIndex,
        x, y,
        x, y + displayHeight,
        x + displayWidth, y + displayHeight,
        x + displayWidth, y,
        frame.u0, frame.v0, frame.u1, frame.v1,
        1, 1, 1, alpha
    );
}
