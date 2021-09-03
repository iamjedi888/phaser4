import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChildColor (id: number): boolean
{
    return Boolean(GameObjectStore.ui8[id][DIRTY.CHILD_COLOR]);
}
