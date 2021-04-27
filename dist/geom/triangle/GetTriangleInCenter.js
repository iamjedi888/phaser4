/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Vec2} from "../../math/vec2/Vec2";
function GetLength(x1, y1, x2, y2) {
  const x = x1 - x2;
  const y = y1 - y2;
  return Math.sqrt(x * x + y * y);
}
export function GetTriangleInCenter(triangle, out = new Vec2()) {
  const {x1, y1, x2, y2, x3, y3} = triangle;
  const d1 = GetLength(x3, y3, x2, y2);
  const d2 = GetLength(x1, y1, x3, y3);
  const d3 = GetLength(x2, y2, x1, y1);
  const p = d1 + d2 + d3;
  return out.set((x1 * d1 + x2 * d2 + x3 * d3) / p, (y1 * d1 + y2 * d2 + y3 * d3) / p);
}
