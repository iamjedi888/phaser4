import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function ClearDirtyWorldTransform (id: number): void
{
    GameObjectStore.f32[id][TRANSFORM.DIRTY_WORLD] = 0;
}
