import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

//  The A, B, C, D, TX, TY elements are a short-form of a 3x3 Matrix, with the last column ignored:

//  |----|----|----|
//  | a  | b  | 0  |
//  |----|----|----|
//  | c  | d  | 0  |
//  |----|----|----|
//  | tx | ty | 1  |
//  |----|----|----|

//  [0] = a - X scale
//  [1] = b - X skew
//  [2] = c - Y skew
//  [3] = d - Y scale
//  [4] = tx - X translation
//  [5] = ty - Y translation

export function SetTransform2DComponent (id: number, x: number = 0, y: number = 0, originX: number = 0, originY: number = 0): void
{
    //  Component defaults to zero, so we only need to set the other values
    //  We could do this via data.set once the array structure is set in stone

    const data = GameObjectStore.f32[id];

    data[TRANSFORM.IS_ROOT] = 0;
    data[TRANSFORM.DIRTY] = 1;
    data[TRANSFORM.X] = x;
    data[TRANSFORM.Y] = y;
    data[TRANSFORM.SCALE_X] = 1;
    data[TRANSFORM.SCALE_Y] = 1;
    data[TRANSFORM.ORIGIN_X] = originX;
    data[TRANSFORM.ORIGIN_Y] = originY;
    data[TRANSFORM.AXIS_ALIGNED] = 1;
    data[TRANSFORM.IN_VIEW] = 1;
}
