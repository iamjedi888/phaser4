import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetDirtyChildColor (id: number): void
{
    GameObjectStore.ui8[id][DIRTY.CHILD_COLOR] = 1;
}
