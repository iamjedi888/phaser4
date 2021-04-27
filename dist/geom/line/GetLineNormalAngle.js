/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetLineAngle} from "./GetLineAngle";
import {MATH_CONST} from "../../math/const";
import {Wrap} from "../../math/Wrap";
export function GetLineNormalAngle(line) {
  const angle = GetLineAngle(line) - MATH_CONST.HALF_PI;
  return Wrap(angle, -Math.PI, Math.PI);
}
