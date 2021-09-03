import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function SetWillCacheChildren (id: number, value: boolean): void
{
    GameObjectStore.ui32[id][PERMISSION.WILL_CACHE_CHILDREN] = Number(value);
}
