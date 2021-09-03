import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetLastChildID (parentID: number, childID: number): void
{
    GameObjectStore.ui32[parentID][HIERARCHY.LAST] = childID;
}
