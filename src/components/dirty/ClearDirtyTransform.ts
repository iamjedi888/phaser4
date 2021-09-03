import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function ClearDirtyTransform (id: number): void
{
    GameObjectStore.f32[id][TRANSFORM.DIRTY] = 0;
}
