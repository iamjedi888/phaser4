import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyDisplayList (id: number): boolean
{
    return Boolean(GameObjectStore.ui8[id][DIRTY.DISPLAY_LIST]);
}
