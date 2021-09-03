import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function SetDirtyWorldTransform (id: number): void
{
    GameObjectStore.f32[id][TRANSFORM.DIRTY_WORLD] = 1;
}
