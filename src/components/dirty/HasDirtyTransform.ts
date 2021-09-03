import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function HasDirtyTransform (id: number): boolean
{
    return Boolean(GameObjectStore.f32[id][TRANSFORM.DIRTY]);
}
