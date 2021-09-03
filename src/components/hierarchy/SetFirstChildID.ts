import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetFirstChildID (parentID: number, childID: number): void
{
    GameObjectStore.ui32[parentID][HIERARCHY.FIRST] = childID;
}
