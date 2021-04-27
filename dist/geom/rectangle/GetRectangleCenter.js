/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetRectangleCenterX} from "./GetRectangleCenterX";
import {GetRectangleCenterY} from "./GetRectangleCenterY";
import {Vec2} from "../../math/vec2/Vec2";
export function GetRectangleCenter(rect, out = new Vec2()) {
  return out.set(GetRectangleCenterX(rect), GetRectangleCenterY(rect));
}
