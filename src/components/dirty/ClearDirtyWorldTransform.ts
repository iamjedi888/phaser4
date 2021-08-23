import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function ClearDirtyWorldTransform (id: number): void
{
    Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD] = 0;
}
