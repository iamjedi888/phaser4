import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetDirtyChildCache (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.CHILD_CACHE] = 1;
}
