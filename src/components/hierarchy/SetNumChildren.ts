import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetNumChildren (parentID: number, total: number): void
{
    GameObjectStore.ui32[parentID][HIERARCHY.NUM_CHILDREN] = total;
}
