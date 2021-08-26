import { IFrame } from './IFrame';

export function SetFramePivot <T extends IFrame> (frame: T, x: number, y: number): T
{
    frame.pivot = { x, y };

    return frame;
}
