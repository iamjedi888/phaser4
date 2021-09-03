import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyWorldTransform (id: number): boolean
{
    return !!(GameObjectStore.f32[id][DIRTY.WORLD_TRANSFORM]);
}
