import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function SetWillUpdate (id: number, value: boolean): void
{
    GameObjectStore.ui8[id][PERMISSION.WILL_UPDATE] = Number(value);
}
