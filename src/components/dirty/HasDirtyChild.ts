import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChild (id: number): boolean
{
    return Boolean(GameObjectStore.ui8[id][DIRTY.CHILD]);
}
