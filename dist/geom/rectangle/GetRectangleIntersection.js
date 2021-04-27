/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Rectangle} from "./Rectangle";
import {RectangleToRectangle} from "../intersects/RectangleToRectangle";
export function GetRectangleIntersection(rectA, rectB, out = new Rectangle()) {
  if (RectangleToRectangle(rectA, rectB)) {
    out.set(Math.max(rectA.x, rectB.x), Math.max(rectA.y, rectB.y), Math.min(rectA.right, rectB.right) - out.x, Math.min(rectA.bottom, rectB.bottom) - out.y);
  } else {
    out.set();
  }
  return out;
}
