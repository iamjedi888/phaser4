import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function UpdateAxisAligned (id: number): void
{
    const rotation = Transform2DComponent.data[id][TRANSFORM.ROTATION];
    const skewX = Transform2DComponent.data[id][TRANSFORM.SKEW_X];
    const skewY = Transform2DComponent.data[id][TRANSFORM.SKEW_Y];

    Transform2DComponent.data[id][TRANSFORM.AXIS_ALIGNED] = Number(rotation === 0 && skewX === 0 && skewY === 0);
}
