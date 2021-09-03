import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyTransforms (id: number): void
{
    const data = GameObjectStore.f32[id];

    data[DIRTY.LOCAL_TRANSFORM] = 0;
    data[DIRTY.WORLD_TRANSFORM] = 0;
}
