import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function IsInView (id: number): boolean
{
    return Boolean(GameObjectStore.f32[id][TRANSFORM.IN_VIEW]);
}
