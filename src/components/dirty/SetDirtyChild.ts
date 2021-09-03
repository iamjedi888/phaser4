import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetDirtyChild (id: number): void
{
    GameObjectStore.ui8[id][DIRTY.CHILD] = 1;
}
