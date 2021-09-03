import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function SetDirtyChildColor (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.CHILD_COLOR] = 1;
}
