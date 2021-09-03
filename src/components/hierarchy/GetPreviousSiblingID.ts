import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function GetPreviousSiblingID (id: number): number
{
    return GameObjectStore.ui32[id][HIERARCHY.PREV];
}
