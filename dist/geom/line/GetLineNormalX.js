/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetLineAngle} from "./GetLineAngle";
import {MATH_CONST} from "../../math/const";
export function GetLineNormalX(line) {
  return Math.cos(GetLineAngle(line) - MATH_CONST.HALF_PI);
}
