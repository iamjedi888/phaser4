/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { MATH_CONST } from "../const";
export function NormalizeAngle(angle) {
  angle = angle % MATH_CONST.PI2;
  if (angle >= 0) {
    return angle;
  } else {
    return angle + MATH_CONST.PI2;
  }
}
