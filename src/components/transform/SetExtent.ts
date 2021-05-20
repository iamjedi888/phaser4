import { Extent2DComponent } from './Extent2DComponent';
import { SetDirtyTransform } from '../dirty';

//  The area covered by this transform component + origin + size (usually from a Frame)

export function SetExtent (id: number, x: number, y: number, width: number, height: number): void
{
    Extent2DComponent.x[id] = x;
    Extent2DComponent.y[id] = y;
    Extent2DComponent.width[id] = width;
    Extent2DComponent.height[id] = height;
    Extent2DComponent.right[id] = x + width;
    Extent2DComponent.bottom[id] = y + height;

    SetDirtyTransform(id);
}
