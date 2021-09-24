import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function IsFixedTransform (id: number): boolean
{
    return !!(Transform2DComponent.data[id][TRANSFORM.FIXED]);
}
