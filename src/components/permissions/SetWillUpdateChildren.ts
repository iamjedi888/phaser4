import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function SetWillUpdateChildren (id: number, value: boolean): void
{
    GameObjectStore.ui32[id][PERMISSION.WILL_UPDATE_CHILDREN] = Number(value);
}
