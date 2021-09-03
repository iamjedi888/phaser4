import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function SetDirtyWorldTransform (id: number): void
{
    GameObjectStore.f32[id][TRANSFORM.DIRTY_WORLD] = 1;
}
