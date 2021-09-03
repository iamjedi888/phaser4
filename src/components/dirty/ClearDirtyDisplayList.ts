import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyDisplayList (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.DISPLAY_LIST] = 0;
}
