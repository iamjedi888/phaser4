import { GetVec2Length } from './GetVec2Length';
import { Vec2 } from './Vec2';
import { Vec2Scale } from './Vec2Scale';

export function Vec2Limit (a: Vec2, max: number, out: Vec2 = new Vec2()): Vec2
{
    const length = GetVec2Length(a);

    if (length && length > max)
    {
        Vec2Scale(out, max / length, out);
    }

    return out;
}
