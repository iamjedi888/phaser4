import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function IsRootTransform (id: number): boolean
{
    return !!(Transform2DComponent.data[id][TRANSFORM.IS_ROOT]);
}
