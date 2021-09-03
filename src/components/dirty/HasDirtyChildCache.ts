import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChildCache (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][DIRTY.CHILD_CACHE]);
}
