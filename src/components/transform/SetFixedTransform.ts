import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function SetFixedTransform (id: number, value: boolean): void
{
    Transform2DComponent.data[id][TRANSFORM.FIXED] = Number(value);
}
