import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyChildTransform (id: number): void
{
    GameObjectStore.ui8[id][DIRTY.CHILD_TRANSFORM] = 0;
}
