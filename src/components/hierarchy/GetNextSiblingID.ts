import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function GetNextSiblingID (id: number): number
{
    return GameObjectStore.ui32[id][HIERARCHY.NEXT];
}
