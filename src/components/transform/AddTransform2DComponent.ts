import { Extent2DComponent } from './Extent2DComponent';
import { GameObjectWorld } from '../GameObjectWorld';
import { LocalMatrix2DComponent } from './LocalMatrix2DComponent';
import { Transform2DComponent } from './Transform2DComponent';
import { WorldMatrix2DComponent } from './WorldMatrix2DComponent';
import { addComponent } from 'bitecs';

export function AddTransform2DComponent (id: number, x: number = 0, y: number = 0, originX: number = 0, originY: number = 0): void
{
    addComponent(GameObjectWorld, Transform2DComponent, id);
    addComponent(GameObjectWorld, Extent2DComponent, id);
    addComponent(GameObjectWorld, LocalMatrix2DComponent, id);
    addComponent(GameObjectWorld, WorldMatrix2DComponent, id);

    //  Defaults

    Transform2DComponent.x[id] = x;
    Transform2DComponent.y[id] = y;
    Transform2DComponent.rotation[id] = 0;
    Transform2DComponent.scaleX[id] = 1;
    Transform2DComponent.scaleY[id] = 1;
    Transform2DComponent.skewX[id] = 0;
    Transform2DComponent.skewY[id] = 0;
    Transform2DComponent.originX[id] = originX;
    Transform2DComponent.originY[id] = originY;

    LocalMatrix2DComponent.a[id] = 1;
    LocalMatrix2DComponent.b[id] = 0;
    LocalMatrix2DComponent.c[id] = 0;
    LocalMatrix2DComponent.d[id] = 1;
    LocalMatrix2DComponent.tx[id] = x;
    LocalMatrix2DComponent.ty[id] = y;

    WorldMatrix2DComponent.a[id] = 1;
    WorldMatrix2DComponent.b[id] = 0;
    WorldMatrix2DComponent.c[id] = 0;
    WorldMatrix2DComponent.d[id] = 1;
    WorldMatrix2DComponent.tx[id] = x;
    WorldMatrix2DComponent.ty[id] = y;
}
