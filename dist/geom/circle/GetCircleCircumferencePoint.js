/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Vec2} from "../../math/vec2/Vec2";
export function GetCircleCircumferencePoint(circle, angle, out = new Vec2()) {
  return out.set(circle.x + circle.radius * Math.cos(angle), circle.y + circle.radius * Math.sin(angle));
}
