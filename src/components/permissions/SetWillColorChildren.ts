import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function SetWillColorChildren (id: number, value: boolean): void
{
    GameObjectStore.ui8[id][PERMISSION.WILL_COLOR_CHILDREN] = Number(value);
}
