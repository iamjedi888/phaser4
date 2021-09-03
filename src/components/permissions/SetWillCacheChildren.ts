import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function SetWillCacheChildren (id: number, value: boolean): void
{
    GameObjectStore.ui8[id][PERMISSION.WILL_CACHE_CHILDREN] = Number(value);
}
