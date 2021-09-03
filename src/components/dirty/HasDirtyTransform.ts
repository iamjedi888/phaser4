import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function HasDirtyTransform (id: number): boolean
{
    return Boolean(GameObjectStore.f32[id][TRANSFORM.DIRTY]);
}
