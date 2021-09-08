import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

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

export function AddTransform2DComponent (id: number): void
{
    addComponent(GameObjectWorld, Transform2DComponent, id);

    //  Component defaults to zero, so we only need to set the other values
    //  We could do this via data.set once the array structure is set in stone

    const data = Transform2DComponent.data[id];

    data[TRANSFORM.SCALE_X] = 1;
    data[TRANSFORM.SCALE_Y] = 1;
    data[TRANSFORM.AXIS_ALIGNED] = 1;
}
