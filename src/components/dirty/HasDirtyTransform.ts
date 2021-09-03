import { DIRTY, GameObjectStore } from '../../gameobjects/GameObjectStore';

export function HasDirtyTransform (id: number): boolean
{
    return !!(GameObjectStore.f32[id][DIRTY.LOCAL_TRANSFORM]);
}
