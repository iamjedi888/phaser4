import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function GetVisibleChildren (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][PERMISSION.VISIBLE_CHILDREN]);
}
