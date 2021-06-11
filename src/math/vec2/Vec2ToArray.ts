import { IVec2Like } from './IVec2Like';

export function Vec2ToArray (v: IVec2Like, dst: Float32List = [], index: number = 0): Float32List
{
    dst[ index ] = v.x;
    dst[ index + 1 ] = v.y;

    return dst;
}
