import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function ClearDirtyTransform (id: number): void
{
    GameObjectStore.f32[id][TRANSFORM.DIRTY] = 0;
}
