import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyChild (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.CHILD] = 0;
}
