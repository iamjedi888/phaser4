import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function BoundsIntersects (id: number, x: number, y: number, right: number, bottom: number): boolean
{
    const data = GameObjectStore.f32[id];

    const bx = data[TRANSFORM.BOUNDS_X1];
    const by = data[TRANSFORM.BOUNDS_Y1];
    const br = data[TRANSFORM.BOUNDS_X2];
    const bb = data[TRANSFORM.BOUNDS_Y2];

    return !(right < bx || bottom < by || x > br || y > bb);
}
