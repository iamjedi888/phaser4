/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { FromPercent } from "../../math/FromPercent";
import { GetEllipseCircumferencePoint } from "./GetEllipseCircumferencePoint";
import { MATH_CONST } from "../../math/const";
import { Vec2 } from "../../math/vec2/Vec2";
export function GetEllipsePoint(ellipse, position, out = new Vec2()) {
  const angle = FromPercent(position, 0, MATH_CONST.PI2);
  return GetEllipseCircumferencePoint(ellipse, angle, out);
}
