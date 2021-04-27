/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Vec2} from "../../math/vec2/Vec2";
export function GetRectangleRandomPoint(rect, out = new Vec2()) {
  return out.set(rect.x + Math.random() * rect.width, rect.y + Math.random() * rect.height);
}
