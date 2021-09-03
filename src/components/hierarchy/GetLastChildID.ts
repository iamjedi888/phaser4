import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function GetLastChildID (parentID: number): number
{
    return GameObjectStore.ui32[parentID][HIERARCHY.LAST];
}
