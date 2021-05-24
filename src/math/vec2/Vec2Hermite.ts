import { Hermite } from '../Hermite';
import { IVec2Like } from './IVec2Like';
import { Vec2 } from './Vec2';

export function Vec2Hermite (a: IVec2Like, b: IVec2Like, c: IVec2Like, d: IVec2Like, t: number, out: Vec2 = new Vec2()): Vec2
{
    return out.set(
        Hermite(a.x, b.x, c.x, d.x, t),
        Hermite(a.y, b.y, c.y, d.y, t)
    );
}
