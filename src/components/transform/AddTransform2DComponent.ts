import { Extent2DComponent } from './Extent2DComponent';
import { GameObjectWorld } from '../../GameObjectWorld';
import { Transform2DComponent } from './Transform2DComponent';
import { addComponent } from 'bitecs';

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
