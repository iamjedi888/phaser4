import { IVec2Like } from '../../math/vec2/IVec2Like';
import { Matrix2D } from '../../math/mat2d';
import { Vec2 } from '../../math/vec2/Vec2';

export function LocalToGlobal (worldTransform: Matrix2D, x: number, y: number, out: IVec2Like = new Vec2()): IVec2Like
{
    const { a, b, c, d, tx, ty } = worldTransform;

    out.x = (a * x) + (c * y) + tx;
    out.y = (b * x) + (d * y) + ty;

    return out;
}
