import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function IsRootTransform (id: number): boolean
{
    return Boolean(GameObjectStore.f32[id][TRANSFORM.IS_ROOT]);
}
