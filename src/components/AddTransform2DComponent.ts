import { GameObjectWorld } from './GameObjectWorld';
import { Transform2DComponent } from './Transform2DComponent';
import { addComponent } from 'bitecs';

export function AddTransform2DComponent (id: number, x: number = 0, y: number = 0, originX: number = 0, originY: number = 0): void
{
    addComponent(GameObjectWorld, Transform2DComponent, id);

    Transform2DComponent.x[id] = x;
    Transform2DComponent.y[id] = y;
    Transform2DComponent.rotation[id] = 0;
    Transform2DComponent.scaleX[id] = 1;
    Transform2DComponent.scaleY[id] = 1;
    Transform2DComponent.skewX[id] = 0;
    Transform2DComponent.skewY[id] = 0;
    Transform2DComponent.originX[id] = originX;
    Transform2DComponent.originY[id] = originY;
}
