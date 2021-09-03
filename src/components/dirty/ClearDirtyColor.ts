import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function ClearDirtyColor (id: number): void
{
    GameObjectStore.ui8[id][DIRTY.COLOR] = 0;
}
