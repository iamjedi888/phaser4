import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyTransform (id: number): void
{
    GameObjectStore.f32[id][DIRTY.LOCAL_TRANSFORM] = 0;
}
