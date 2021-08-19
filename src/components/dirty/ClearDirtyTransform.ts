import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function ClearDirtyTransform (id: number): void
{
    Transform2DComponent.data[id][TRANSFORM.DIRTY] = 0;
}
