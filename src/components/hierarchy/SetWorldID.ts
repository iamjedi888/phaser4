import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetWorldID (id: number, worldID: number): void
{
    GameObjectStore.ui32[id][HIERARCHY.WORLD] = worldID;
}
