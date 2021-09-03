import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function UpdateAxisAligned (id: number): void
{
    const data = GameObjectStore.f32[id];

    const rotation = data[TRANSFORM.ROTATION];
    const skewX = data[TRANSFORM.SKEW_X];
    const skewY = data[TRANSFORM.SKEW_Y];

    data[TRANSFORM.AXIS_ALIGNED] = Number(rotation === 0 && skewX === 0 && skewY === 0);
}
