import { IFrame } from './IFrame';
import { UpdateFrameUVs } from './UpdateFrameUVs';

export function SetFrameSize <T extends IFrame> (frame: T, width: number, height: number): T
{
    frame.width = width;
    frame.height = height;
    frame.sourceSizeWidth = width;
    frame.sourceSizeHeight = height;

    return UpdateFrameUVs(frame);
}
