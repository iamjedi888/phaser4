import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function HasParent (id: number): boolean
{
    return GameObjectStore.ui32[id][HIERARCHY.PARENT] > 0;
}
