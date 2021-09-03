import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChildColor (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][DIRTY.CHILD_COLOR]);
}
