import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function GetSkewY (id: number): number
{
    return Transform2DComponent.data[id][TRANSFORM.SKEW_Y];
}
