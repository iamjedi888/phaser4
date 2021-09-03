import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function HasDirtyWorldTransform (id: number): boolean
{
    return Boolean(GameObjectStore.f32[id][TRANSFORM.DIRTY_WORLD]);
}
