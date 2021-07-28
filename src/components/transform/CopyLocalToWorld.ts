import { Transform2DComponent } from './Transform2DComponent';

export function CopyLocalToWorld (source: number, target: number): void
{
    Transform2DComponent.world[target].set(Transform2DComponent.local[source]);
}
