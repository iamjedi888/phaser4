import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetDirtyTransform } from '../dirty/SetDirtyTransform';

//  The area covered by this transform component + origin + size (usually from a Frame)

export function SetExtent (id: number, x: number, y: number, width: number, height: number): void
{
    const data = Transform2DComponent.data[id];

    data[TRANSFORM.FRAME_X1] = x;
    data[TRANSFORM.FRAME_Y1] = y;
    data[TRANSFORM.FRAME_X2] = x + width;
    data[TRANSFORM.FRAME_Y2] = y + height;
    data[TRANSFORM.FRAME_WIDTH] = width;
    data[TRANSFORM.FRAME_HEIGHT] = height;

    SetDirtyTransform(id);
}
