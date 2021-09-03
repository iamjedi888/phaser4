import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function GetNumChildren (id: number): number
{
    return GameObjectStore.ui32[id][HIERARCHY.NUM_CHILDREN];
}
