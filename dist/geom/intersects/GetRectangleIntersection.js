/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Rectangle} from "../rectangle/Rectangle";
import {RectangleToRectangle} from "./RectangleToRectangle";
export function GetRectangleIntersection(rectA, rectB, out = new Rectangle()) {
  if (RectangleToRectangle(rectA, rectB)) {
    const x = Math.max(rectA.x, rectB.x);
    const y = Math.max(rectA.y, rectB.y);
    return out.set(x, y, Math.min(rectA.right, rectB.right) - x, Math.min(rectA.bottom, rectB.bottom) - y);
  }
}
