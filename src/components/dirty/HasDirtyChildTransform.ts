import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChildTransform (id: number): boolean
{
    return Boolean(GameObjectStore.ui8[id][DIRTY.CHILD_TRANSFORM]);
}
