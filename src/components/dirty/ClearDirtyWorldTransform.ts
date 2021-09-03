import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function ClearDirtyWorldTransform (id: number): void
{
    GameObjectStore.f32[id][TRANSFORM.DIRTY_WORLD] = 0;
}
