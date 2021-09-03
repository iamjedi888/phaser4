import { GameObjectStore, TRANSFORM } from '../../gameobjects/GameObjectStore';

export function SetInView (id: number, value: boolean): void
{
    GameObjectStore.f32[id][TRANSFORM.IN_VIEW] = Number(value);
}
