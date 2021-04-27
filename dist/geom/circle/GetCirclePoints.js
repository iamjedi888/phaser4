/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {FromPercent} from "../../math/FromPercent";
import {GetCircleCircumference} from "./GetCircleCircumference";
import {GetCircleCircumferencePoint} from "./GetCircleCircumferencePoint";
import {MATH_CONST} from "../../math/const";
export function GetCirclePoints(circle, step, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetCircleCircumference(circle) / step;
  }
  for (let i = 0; i < quantity; i++) {
    const angle = FromPercent(i / quantity, 0, MATH_CONST.PI2);
    out.push(GetCircleCircumferencePoint(circle, angle));
  }
  return out;
}
