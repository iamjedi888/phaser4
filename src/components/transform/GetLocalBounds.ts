import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function GetLocalBounds (id: number): { left: number, top: number, right: number, bottom: number }
{
    const data = Transform2DComponent.data[id];

    const left = data[TRANSFORM.BOUNDS_X1];
    const top = data[TRANSFORM.BOUNDS_Y1];
    const right = data[TRANSFORM.BOUNDS_X2];
    const bottom = data[TRANSFORM.BOUNDS_Y2];

    return { left, top, right, bottom };
}
