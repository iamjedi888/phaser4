import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function WillUpdate (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][PERMISSION.WILL_UPDATE]);
}
