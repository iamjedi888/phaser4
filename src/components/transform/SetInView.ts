import { TRANSFORM, Transform2DComponent } from '../transform/Transform2DComponent';

export function SetInView (id: number, value: boolean): void
{
    GameObjectStore.f32[id][TRANSFORM.IN_VIEW] = Number(value);
}
