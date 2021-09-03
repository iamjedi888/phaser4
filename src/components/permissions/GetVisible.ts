import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function GetVisible (id: number): boolean
{
    return Boolean(GameObjectStore.ui8[id][PERMISSION.VISIBLE]);
}
