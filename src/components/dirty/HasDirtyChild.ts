import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChild (id: number): boolean
{
    return !!(GameObjectStore.ui32[id][DIRTY.CHILD]);
}
