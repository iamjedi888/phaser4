import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function IsRootTransform (id: number): boolean
{
    return !!(GameObjectStore.f32[id][TRANSFORM.IS_ROOT]);
}
