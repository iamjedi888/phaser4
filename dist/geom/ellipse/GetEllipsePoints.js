/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { FromPercent } from "../../math/FromPercent";
import { GetEllipseCircumference } from "./GetEllipseCircumference";
import { GetEllipseCircumferencePoint } from "./GetEllipseCircumferencePoint";
import { MATH_CONST } from "../../math/const";
export function GetEllipsePoints(ellipse, step, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetEllipseCircumference(ellipse) / step;
  }
  for (let i = 0; i < quantity; i++) {
    const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
    out.push(GetEllipseCircumferencePoint(ellipse, angle));
  }
  return out;
}
