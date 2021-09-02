import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function IsRootTransform (id: number): boolean
{
    return Boolean(Transform2DComponent.data[id][TRANSFORM.IS_ROOT]);
}
