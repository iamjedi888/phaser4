import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChildTransform (id: number): boolean
{
    return !!(GameObjectStore.ui32[id][DIRTY.CHILD_TRANSFORM]);
}
