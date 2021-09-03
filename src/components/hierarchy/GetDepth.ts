import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function GetDepth (id: number): number
{
    return GameObjectStore.ui32[id][HIERARCHY.DEPTH];
}
