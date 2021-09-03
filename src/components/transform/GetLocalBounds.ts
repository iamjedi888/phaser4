import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function GetLocalBounds (id: number): { x: number, y: number, right: number, bottom: number }
{
    const data = GameObjectStore.f32[id];

    const x = data[TRANSFORM.BOUNDS_X1];
    const y = data[TRANSFORM.BOUNDS_Y1];
    const right = data[TRANSFORM.BOUNDS_X2];
    const bottom = data[TRANSFORM.BOUNDS_Y2];

    return { x, y, right, bottom };
}
