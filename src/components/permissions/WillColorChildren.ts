import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function WillColorChildren (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][PERMISSION.WILL_COLOR_CHILDREN]);
}
