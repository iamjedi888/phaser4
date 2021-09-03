import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyColor (id: number): void
{
    GameObjectStore.ui32[id][DIRTY.COLOR] = 0;
}
