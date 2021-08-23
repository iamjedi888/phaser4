import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function SetDirtyWorldTransform (id: number): void
{
    Transform2DComponent.data[id][TRANSFORM.DIRTY_WORLD] = 1;
}
