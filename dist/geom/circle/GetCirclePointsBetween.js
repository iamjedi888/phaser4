/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { FromPercent } from "../../math/FromPercent";
import { GetCircleCircumference } from "./GetCircleCircumference";
import { GetCircleCircumferencePoint } from "./GetCircleCircumferencePoint";
import { MATH_CONST } from "../../math/const";
import { Vec2 } from "../../math/vec2/Vec2";
export function GetCirclePointsBetween(circle, startAngle, endAngle, step, anticlockwise = false, includeCenter = false, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetCircleCircumference(circle) / step;
  }
  for (let i = 0; i < quantity; i++) {
    const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
    if (angle >= startAngle && angle <= endAngle) {
      out.push(GetCircleCircumferencePoint(circle, angle));
    }
  }
  if (anticlockwise) {
    out = out.reverse();
  }
  if (includeCenter) {
    out.push(new Vec2(circle.x, circle.y));
  }
  return out;
}
