import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function SetBounds (id: number, x: number, y: number, right: number, bottom: number): void
{
    const data = GameObjectStore.f32[id];

    data[TRANSFORM.BOUNDS_X1] = x;
    data[TRANSFORM.BOUNDS_Y1] = y;
    data[TRANSFORM.BOUNDS_X2] = right;
    data[TRANSFORM.BOUNDS_Y2] = bottom;
}
