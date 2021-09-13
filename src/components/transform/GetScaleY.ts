import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function GetScaleY (id: number): number
{
    return Transform2DComponent.data[id][TRANSFORM.SCALE_Y];
}
