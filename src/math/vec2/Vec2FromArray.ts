import { IVec2 } from './IVec2';

export function Vec2FromArray (dst: IVec2, src: Float32List = [], index: number = 0): IVec2
{
    return dst.set(
        src[ index ],
        src[ index + 1 ]
    );
}
