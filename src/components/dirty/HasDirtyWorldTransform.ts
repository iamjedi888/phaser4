import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function HasDirtyWorldTransform (id: number): boolean
{
    return Boolean(Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD]);
}
