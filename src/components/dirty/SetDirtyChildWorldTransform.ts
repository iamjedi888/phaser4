import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetDirtyChildWorldTransform (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.CHILD_WORLD_TRANSFORM] = 1;
}
