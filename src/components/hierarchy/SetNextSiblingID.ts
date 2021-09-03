import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetNextSiblingID (parentID: number, childID: number): void
{
    GameObjectStore.ui32[parentID][HIERARCHY.NEXT] = childID;
}
