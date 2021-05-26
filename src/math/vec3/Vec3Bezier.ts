import { Bezier } from '../Bezier';
import { IVec3Like } from './IVec3Like';
import { Vec3 } from './Vec3';

export function Vec3Bezier (a: IVec3Like, b: IVec3Like, c: IVec3Like, d: IVec3Like, t: number, out: Vec3 = new Vec3()): Vec3
{
    return out.set(
        Bezier(a.x, b.x, c.x, d.x, t),
        Bezier(a.y, b.y, c.y, d.y, t),
        Bezier(a.z, b.z, c.z, d.z, t)
    );
}
