import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function SetDirtyTransform (id: number): void
{
    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 1;
}
