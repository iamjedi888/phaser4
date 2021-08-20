import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { GameObjectWorld } from '../../GameObjectWorld';
import { addComponent } from 'bitecs';

//  The 'local' and 'world' arrays are Matrix2Ds and contains
//  six elements in a short-form of the 3x3 Matrix, with the last column ignored:

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

export function AddTransform2DComponent (id: number, x: number = 0, y: number = 0, originX: number = 0, originY: number = 0): void
{
    addComponent(GameObjectWorld, Transform2DComponent, id);

    //  Component defaults to zero, so we only need to set the other values
    //  We could do this via data.set once the array structure is set in stone

    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 1;
    Transform2DComponent.data[id][TRANSFORM.X] = x;
    Transform2DComponent.data[id][TRANSFORM.Y] = y;
    Transform2DComponent.data[id][TRANSFORM.SCALE_X] = 1;
    Transform2DComponent.data[id][TRANSFORM.SCALE_Y] = 1;
    Transform2DComponent.data[id][TRANSFORM.ORIGIN_X] = originX;
    Transform2DComponent.data[id][TRANSFORM.ORIGIN_Y] = originY;
    Transform2DComponent.data[id][TRANSFORM.AXIS_ALIGNED] = 1;

    //  Likely don't need to do this, as it's done in render anyway:
    // Transform2DComponent.data[id][TRANSFORM.LOCAL_A] = 1;
    // Transform2DComponent.data[id][TRANSFORM.LOCAL_B] = 0;
    // Transform2DComponent.data[id][TRANSFORM.LOCAL_C] = 0;
    // Transform2DComponent.data[id][TRANSFORM.LOCAL_D] = 1;
    // Transform2DComponent.data[id][TRANSFORM.LOCAL_TX] = x;
    // Transform2DComponent.data[id][TRANSFORM.LOCAL_TY] = y;

    // Transform2DComponent.data[id][TRANSFORM.WORLD_A] = 1;
    // Transform2DComponent.data[id][TRANSFORM.WORLD_B] = 0;
    // Transform2DComponent.data[id][TRANSFORM.WORLD_C] = 0;
    // Transform2DComponent.data[id][TRANSFORM.WORLD_D] = 1;
    // Transform2DComponent.data[id][TRANSFORM.WORLD_TX] = x;
    // Transform2DComponent.data[id][TRANSFORM.WORLD_TY] = y;
}
