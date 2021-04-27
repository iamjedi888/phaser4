/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetLineAngle} from "./GetLineAngle";
import {MATH_CONST} from "../../math/const";
import {Vec2} from "../../math/vec2/Vec2";
export function GetLineNormal(line, out = new Vec2()) {
  const a = GetLineAngle(line) - MATH_CONST.HALF_PI;
  out.x = Math.cos(a);
  out.y = Math.sin(a);
  return out;
}
