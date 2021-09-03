import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function ClearDirtyTransforms (id: number): void
{
    const data = GameObjectStore.f32[id];

    data[TRANSFORM.DIRTY] = 0;
    data[TRANSFORM.DIRTY_WORLD] = 0;
}
