import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyChildTransform (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.CHILD_TRANSFORM] = 0;
}
