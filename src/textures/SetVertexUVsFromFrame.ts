import { IFrame } from './IFrame';
import { SetQuadUVs } from '../components/vertices/SetQuadUVs';

export function SetVertexUVsFromFrame <T extends IFrame> (id: number, frame: T): T
{
    SetQuadUVs(id, frame.u0, frame.v0, frame.u1, frame.v1);

    return frame;
}
