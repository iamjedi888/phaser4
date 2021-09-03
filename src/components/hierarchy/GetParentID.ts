import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function GetParentID (id: number): number
{
    return GameObjectStore.ui32[id][HIERARCHY.PARENT];
}
