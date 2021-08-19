import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function BoundsIntersects (id: number, x: number, y: number, right: number, bottom: number): boolean
{
    const bx = Transform2DComponent.data[id][TRANSFORM.BOUNDS_X1];
    const by = Transform2DComponent.data[id][TRANSFORM.BOUNDS_Y1];
    const br = Transform2DComponent.data[id][TRANSFORM.BOUNDS_X2];
    const bb = Transform2DComponent.data[id][TRANSFORM.BOUNDS_Y2];

    return !(right < bx || bottom < by || x > br || y > bb);
}
