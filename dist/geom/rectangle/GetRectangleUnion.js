/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Rectangle} from "./Rectangle";
export function GetRectangleUnion(rectA, rectB, out = new Rectangle()) {
  const x = Math.min(rectA.x, rectB.x);
  const y = Math.min(rectA.y, rectB.y);
  const w = Math.max(rectA.right, rectB.right) - x;
  const h = Math.max(rectA.bottom, rectB.bottom) - y;
  return out.set(x, y, w, h);
}
