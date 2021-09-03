import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function SetWillTransformChildren (id: number, value: boolean): void
{
    GameObjectStore.ui32[id][PERMISSION.WILL_TRANSFORM_CHILDREN] = Number(value);
}
