import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetParentID (childID: number, parentID: number): void
{
    GameObjectStore.ui32[childID][HIERARCHY.PARENT] = parentID;
}
