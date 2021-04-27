/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {DegToRad} from "../../math/DegToRad";
import {GetRectangleCenterX} from "./GetRectangleCenterX";
import {GetRectangleCenterY} from "./GetRectangleCenterY";
import {Vec2} from "../../math/vec2/Vec2";
export function GetRectanglePerimeterPoint(rectangle, angle, out = new Vec2()) {
  angle = DegToRad(angle);
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  let dx = c > 0 ? rectangle.width / 2 : rectangle.width / -2;
  let dy = s > 0 ? rectangle.height / 2 : rectangle.height / -2;
  if (Math.abs(dx * s) < Math.abs(dy * c)) {
    dy = dx * s / c;
  } else {
    dx = dy * c / s;
  }
  return out.set(dx + GetRectangleCenterX(rectangle), dy + GetRectangleCenterY(rectangle));
}
