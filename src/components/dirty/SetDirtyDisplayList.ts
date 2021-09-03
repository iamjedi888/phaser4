import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetDirtyDisplayList (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.DISPLAY_LIST] = 1;
}
