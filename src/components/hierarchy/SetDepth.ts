import { GameObjectStore, HIERARCHY } from '../../gameobjects/GameObjectStore';

export function SetDepth (id: number, depth: number): void
{
    GameObjectStore.ui32[id][HIERARCHY.DEPTH] = depth;
}
