import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyColor (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][DIRTY.COLOR]);
}
