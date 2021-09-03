import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChildTransform (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][DIRTY.CHILD_TRANSFORM]);
}
