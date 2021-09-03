import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetWorldAndParentID (id: number, worldID: number, parentID: number): void
{
    GameObjectStore.ui32[id][HIERARCHY.WORLD] = worldID;
    GameObjectStore.ui32[id][HIERARCHY.PARENT] = parentID;
}
