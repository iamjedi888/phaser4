import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function GetFirstChildID (parentID: number): number
{
    return GameObjectStore.ui32[parentID][HIERARCHY.FIRST];
}
