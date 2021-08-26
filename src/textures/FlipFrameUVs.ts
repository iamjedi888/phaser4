import { IFrame } from './IFrame';

export function FlipFrameUVs <T extends IFrame> (frame: T): T
{
    frame.v0 = 1 - frame.v0;
    frame.v1 = 1 - frame.v1;

    return frame;
}
