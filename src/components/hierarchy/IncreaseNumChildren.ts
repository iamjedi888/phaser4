import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function IncreaseNumChildren (parentID: number, total: number = 1): void
{
    GameObjectStore.ui32[parentID][HIERARCHY.NUM_CHILDREN] += total;
}
