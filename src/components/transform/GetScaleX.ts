import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function GetScaleX (id: number): number
{
    return Transform2DComponent.data[id][TRANSFORM.SCALE_X];
}
