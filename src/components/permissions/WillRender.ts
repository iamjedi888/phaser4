import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function WillRender (id: number): boolean
{
    return Boolean(GameObjectStore.ui8[id][PERMISSION.VISIBLE]) && Boolean(GameObjectStore.ui8[id][PERMISSION.WILL_RENDER]);
}
