import { IFrame } from './IFrame';

export function SetFrameSourceSize <T extends IFrame> (frame: T, width: number, height: number): T
{
    frame.sourceSizeWidth = width;
    frame.sourceSizeHeight = height;

    return frame;
}
