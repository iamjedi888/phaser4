import { IFrame } from './IFrame';
import { SetUV } from '../components/vertices/SetUV';

export function SetVertexUVsFromFrame <T extends IFrame> (id: number, frame: T): T
{
    SetUV(id, frame.u0, frame.v0, frame.u1, frame.v1);

    return frame;
}
