import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyChildColor (id: number): void
{
    GameObjectStore.ui8[id][DIRTY.CHILD_COLOR] = 0;
}
