import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function GetRotation (id: number): number
{
    return Transform2DComponent.data[id][TRANSFORM.ROTATION];
}
