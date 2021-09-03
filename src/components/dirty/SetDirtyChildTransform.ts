import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetDirtyChildTransform (id: number): void
{
    GameObjectStore.ui8[id][DIRTY.CHILD_TRANSFORM] = 1;
}
