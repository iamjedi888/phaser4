import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function GetSkewX (id: number): number
{
    return Transform2DComponent.data[id][TRANSFORM.SKEW_X];
}
