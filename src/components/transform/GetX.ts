import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function GetX (id: number): number
{
    return Transform2DComponent.data[id][TRANSFORM.X];
}
