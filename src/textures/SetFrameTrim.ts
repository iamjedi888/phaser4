import { IFrame } from './IFrame';

export function SetFrameTrim <T extends IFrame> (frame: T, width: number, height: number, x: number, y: number, w: number, h: number): T
{
    frame.trimmed = true;

    frame.sourceSizeWidth = width;
    frame.sourceSizeHeight = height;

    frame.spriteSourceSizeX = x;
    frame.spriteSourceSizeY = y;
    frame.spriteSourceSizeWidth = w;
    frame.spriteSourceSizeHeight = h;

    return frame;
}
