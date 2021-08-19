import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function HasDirtyTransform (id: number): boolean
{
    return Boolean(Transform2DComponent.data[id][TRANSFORM.DIRTY]);
}
