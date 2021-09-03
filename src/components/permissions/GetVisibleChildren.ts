import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function GetVisibleChildren (id: number): boolean
{
    return Boolean(GameObjectStore.ui8[id][PERMISSION.VISIBLE_CHILDREN]);
}
