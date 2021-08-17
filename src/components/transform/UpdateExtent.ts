import { Extent2DComponent } from './Extent2DComponent';
import { SetDirtyTransform } from '../dirty/SetDirtyTransform';
import { Transform2DComponent } from './Transform2DComponent';

export function UpdateExtent (id: number, width: number, height: number): void
{
    const x = -(Transform2DComponent.originX[id]) * width;
    const y = -(Transform2DComponent.originY[id]) * height;

    Extent2DComponent.x[id] = x;
    Extent2DComponent.y[id] = y;
    Extent2DComponent.width[id] = width;
    Extent2DComponent.height[id] = height;
    Extent2DComponent.right[id] = x + width;
    Extent2DComponent.bottom[id] = y + height;

    const world = Transform2DComponent.world[id];

    world[6] = x;
    world[7] = y;
    world[8] = x + width;
    world[9] = y + height;
    world[10] = width;
    world[11] = height;

    SetDirtyTransform(id);
}
