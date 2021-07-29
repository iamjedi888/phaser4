import { Extent2DComponent } from './Extent2DComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { Transform2DComponent } from './Transform2DComponent';
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
    addComponent(GameObjectWorld, Extent2DComponent, id);

    //  Component defaults to zero, so we only need to set the other values

    Transform2DComponent.x[id] = x;
    Transform2DComponent.y[id] = y;
    Transform2DComponent.scaleX[id] = 1;
    Transform2DComponent.scaleY[id] = 1;
    Transform2DComponent.originX[id] = originX;
    Transform2DComponent.originY[id] = originY;

    Transform2DComponent.local[id].set([ 1, 0, 0, 1, x, y ]);
    Transform2DComponent.world[id].set([ 1, 0, 0, 1, x, y ]);
}
