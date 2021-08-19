import { TRANSFORM, Transform2DComponent } from './Transform2DComponent';

export function CopyWorldToWorld (source: number, target: number): void
{
    // Transform2DComponent.world[target].set(Transform2DComponent.world[source]);

    Transform2DComponent.data[target][TRANSFORM.WORLD_A] = Transform2DComponent.data[source][TRANSFORM.WORLD_A];
    Transform2DComponent.data[target][TRANSFORM.WORLD_B] = Transform2DComponent.data[source][TRANSFORM.WORLD_B];
    Transform2DComponent.data[target][TRANSFORM.WORLD_C] = Transform2DComponent.data[source][TRANSFORM.WORLD_C];
    Transform2DComponent.data[target][TRANSFORM.WORLD_D] = Transform2DComponent.data[source][TRANSFORM.WORLD_D];
    Transform2DComponent.data[target][TRANSFORM.WORLD_TX] = Transform2DComponent.data[source][TRANSFORM.WORLD_TX];
    Transform2DComponent.data[target][TRANSFORM.WORLD_TY] = Transform2DComponent.data[source][TRANSFORM.WORLD_TY];
}
