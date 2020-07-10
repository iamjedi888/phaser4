import { CatmullRom } from '../CatmullRom';
import { IVec2Like } from './IVec2Like';
import { Vec2 } from './Vec2';

// Gets a new Vector2 for float t on the CatmullRom spline defined by the 4 points

export function Vec2CatmullRom (p1: IVec2Like, p2: IVec2Like, p3: IVec2Like, p4: IVec2Like, t: number, out: Vec2 = new Vec2()): Vec2
{
    return out.set(
        CatmullRom(t, p1.x, p2.x, p3.x, p4.x),
        CatmullRom(t, p1.y, p2.y, p3.y, p4.y)
    );
}
