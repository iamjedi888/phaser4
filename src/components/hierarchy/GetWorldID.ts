import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function GetWorldID (id: number): number
{
    return GameObjectStore.ui32[id][HIERARCHY.WORLD];
}
