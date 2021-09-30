import { IFrame } from './IFrame';

export function UpdateFrameUVs <T extends IFrame> (frame: T): T
{
    const { x, y, width, height } = frame;

    const baseTextureWidth = frame.texture.width;
    const baseTextureHeight = frame.texture.height;

    frame.u0 = x / baseTextureWidth;
    frame.v0 = y / baseTextureHeight;

    frame.u1 = (x + width) / baseTextureWidth;
    frame.v1 = (y + height) / baseTextureHeight;

    frame.fWidth = width / baseTextureWidth;
    frame.fHeight = height / baseTextureHeight;

    return frame;
}
