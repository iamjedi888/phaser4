import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetPreviousSiblingID (parentID: number, childID: number): void
{
    GameObjectStore.ui32[parentID][HIERARCHY.PREV] = childID;
}
