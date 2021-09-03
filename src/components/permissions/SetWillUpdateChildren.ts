import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function SetWillUpdateChildren (id: number, value: boolean): void
{
    GameObjectStore.ui8[id][PERMISSION.WILL_UPDATE_CHILDREN] = Number(value);
}
