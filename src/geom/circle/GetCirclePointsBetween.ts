/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import { FromPercent } from '../../math/FromPercent';
import { GetCircleCircumference } from './GetCircleCircumference';
import { GetCircleCircumferencePoint } from './GetCircleCircumferencePoint';
import { ICircle } from './ICircle';
import { MATH_CONST } from '../../math/const';
import { Vec2 } from '../../math/vec2/Vec2';

/**
 * Returns an array of Point objects containing the coordinates of the points around the circumference of the Circle,
 * based on the given quantity or stepRate values.
 *
 * Points returned are only those within startAngle to endAngle, inclusive.
 *
 * Angles are given in radians.
 */
export function GetCirclePointsBetween (circle: ICircle, startAngle: number, endAngle: number, step: number, anticlockwise: boolean = false, includeCenter: boolean = false, quantity: number = 0, out: Vec2[] = []): Vec2[]
{
    //  If quantity is a falsey value (false, null, 0, undefined, etc) then we calculate it based on the stepRate instead.
    if (!quantity)
    {
        quantity = GetCircleCircumference(circle) / step;
    }

    for (let i = 0; i < quantity; i++)
    {
        const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);

        if (angle >= startAngle && angle <= endAngle)
        {
            out.push(GetCircleCircumferencePoint(circle, angle));
        }
    }

    if (anticlockwise)
    {
        out = out.reverse();
    }

    if (includeCenter)
    {
        out.push(new Vec2(circle.x, circle.y));
    }

    return out;
}
