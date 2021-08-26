import { IFrame } from './IFrame';

export function GetExtentFromFrame <F extends IFrame> (frame: F, originX: number, originY: number): { left: number; right: number; top: number; bottom: number }
{
    const sourceSizeWidth = frame.sourceSizeWidth;
    const sourceSizeHeight = frame.sourceSizeHeight;

    let left: number;
    let right: number;
    let top: number;
    let bottom: number;

    if (frame.trimmed)
    {
        left = frame.spriteSourceSizeX - (originX * sourceSizeWidth);
        right = left + frame.spriteSourceSizeWidth;

        top = frame.spriteSourceSizeY - (originY * sourceSizeHeight);
        bottom = top + frame.spriteSourceSizeHeight;
    }
    else
    {
        left = -originX * sourceSizeWidth;
        right = left + sourceSizeWidth;

        top = -originY * sourceSizeHeight;
        bottom = top + sourceSizeHeight;
    }

    return { left, right, top, bottom };
}
