import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function WillRender (id: number): boolean
{
    return Boolean(GameObjectStore.ui32[id][PERMISSION.VISIBLE]) && Boolean(GameObjectStore.ui32[id][PERMISSION.WILL_RENDER]);
}
