import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetDirtyChild (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.CHILD] = 1;
}
