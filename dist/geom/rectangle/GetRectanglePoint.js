/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetRectanglePerimeter} from "./GetRectanglePerimeter";
import {Vec2} from "../../math/vec2/Vec2";
export function GetRectanglePoint(rectangle, position, out = new Vec2()) {
  if (position <= 0 || position >= 1) {
    return out.set(rectangle.x, rectangle.y);
  }
  let p = GetRectanglePerimeter(rectangle) * position;
  if (position > 0.5) {
    p -= rectangle.width + rectangle.height;
    if (p <= rectangle.width) {
      return out.set(rectangle.right - p, rectangle.bottom);
    } else {
      return out.set(rectangle.x, rectangle.bottom - (p - rectangle.width));
    }
  } else if (p <= rectangle.width) {
    return out.set(rectangle.x + p, rectangle.y);
  } else {
    return out.set(rectangle.right, rectangle.y + (p - rectangle.width));
  }
}
