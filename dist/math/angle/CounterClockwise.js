/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { MATH_CONST as CONST } from "../const";
export function CounterClockwise(angle) {
  if (angle > Math.PI) {
    angle -= CONST.PI2;
  }
  return Math.abs(((angle + CONST.HALF_PI) % CONST.PI2 - CONST.PI2) % CONST.PI2);
}
