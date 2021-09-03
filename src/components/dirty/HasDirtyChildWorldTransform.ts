import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyChildWorldTransform (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][DIRTY.CHILD_WORLD_TRANSFORM]);
}
