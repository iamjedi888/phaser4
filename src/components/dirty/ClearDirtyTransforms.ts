import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function ClearDirtyTransforms (id: number): void
{
    const data = Transform2DComponent.data[id];

    data[TRANSFORM.DIRTY] = 0;
    data[TRANSFORM.DIRTY_WORLD] = 0;
}
