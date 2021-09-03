import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyDisplayList (id: number): void
{
    GameObjectStore.ui8[id][DIRTY.DISPLAY_LIST] = 0;
}
