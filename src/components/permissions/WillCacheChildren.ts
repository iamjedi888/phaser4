import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function WillCacheChildren (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][PERMISSION.WILL_CACHE_CHILDREN]);
}
