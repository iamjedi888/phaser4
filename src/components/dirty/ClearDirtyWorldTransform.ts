import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyWorldTransform (id: number): void
{
    GameObjectStore.f32[id][DIRTY.WORLD_TRANSFORM] = 0;
}
