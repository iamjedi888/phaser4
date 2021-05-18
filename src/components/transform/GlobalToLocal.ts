import { ITransformComponent } from './ITransformComponent';
import { IVec2Like } from '../../math/vec2/IVec2Like';
import { Vec2 } from '../../math/vec2/Vec2';

export function GlobalToLocal (transform: ITransformComponent, x: number, y: number, out: IVec2Like = new Vec2()): IVec2Like
{
    const { a, b, c, d, tx, ty } = transform.world;

    const id: number = 1 / ((a * d) + (c * -b));

    out.x = (d * id * x) + (-c * id * y) + (((ty * c) - (tx * d)) * id);
    out.y = (a * id * y) + (-b * id * x) + (((-ty * a) + (tx * b)) * id);

    return out;
}
