import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyDisplayList (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][DIRTY.DISPLAY_LIST]);
}
