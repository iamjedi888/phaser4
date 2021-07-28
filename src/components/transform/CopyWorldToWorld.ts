import { Transform2DComponent } from './Transform2DComponent';

export function CopyWorldToWorld (source: number, target: number): void
{
    Transform2DComponent.world[target].set(Transform2DComponent.world[source]);
}
