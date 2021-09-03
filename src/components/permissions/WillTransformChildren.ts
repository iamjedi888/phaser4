import { GameObjectStore, PERMISSION } from '../../gameobjects/GameObjectStore';

export function WillTransformChildren (id: number): boolean
{
    return Boolean(GameObjectStore.ui8[id][PERMISSION.WILL_TRANSFORM_CHILDREN]);
}
