import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

import { SetDirtyTransform } from '../dirty/SetDirtyTransform';

export function UpdateExtent (id: number, width: number, height: number): void
{
    const x = -(Transform2DComponent.data[id][TRANSFORM.ORIGIN_X]) * width;
    const y = -(Transform2DComponent.data[id][TRANSFORM.ORIGIN_Y]) * height;

    Transform2DComponent.data[id][TRANSFORM.FRAME_X1] = x;
    Transform2DComponent.data[id][TRANSFORM.FRAME_Y1] = y;
    Transform2DComponent.data[id][TRANSFORM.FRAME_X2] = x + width;
    Transform2DComponent.data[id][TRANSFORM.FRAME_Y2] = y + height;
    Transform2DComponent.data[id][TRANSFORM.FRAME_WIDTH] = width;
    Transform2DComponent.data[id][TRANSFORM.FRAME_HEIGHT] = height;

    //  Really?!
    Transform2DComponent.data[id][TRANSFORM.WORLD_A] = x;
    Transform2DComponent.data[id][TRANSFORM.WORLD_B] = y;
    Transform2DComponent.data[id][TRANSFORM.WORLD_C] = x + width;
    Transform2DComponent.data[id][TRANSFORM.WORLD_D] = y + height;
    Transform2DComponent.data[id][TRANSFORM.WORLD_TX] = width;
    Transform2DComponent.data[id][TRANSFORM.WORLD_TY] = height;

    SetDirtyTransform(id);
}
