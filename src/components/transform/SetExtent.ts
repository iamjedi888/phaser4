import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetDirtyTransform } from '../dirty/SetDirtyTransform';

//  The area covered by this transform component + origin + size (usually from a Frame)

export function SetExtent (id: number, x: number, y: number, width: number, height: number): void
{
    Transform2DComponent.data[id][TRANSFORM.FRAME_X1] = x;
    Transform2DComponent.data[id][TRANSFORM.FRAME_Y1] = y;
    Transform2DComponent.data[id][TRANSFORM.FRAME_X2] = x + width;
    Transform2DComponent.data[id][TRANSFORM.FRAME_Y2] = y + height;
    Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH] = width;
    Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT] = height;

    SetDirtyTransform(id);
}
