/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Vec2 } from "../../math/vec2/Vec2";
function Det(m00, m01, m10, m11) {
  return m00 * m11 - m01 * m10;
}
export function GetTriangleCircumCenter(triangle, out = new Vec2()) {
  const cx = triangle.x3;
  const cy = triangle.y3;
  const ax = triangle.x1 - cx;
  const ay = triangle.y1 - cy;
  const bx = triangle.x2 - cx;
  const by = triangle.y2 - cy;
  const denom = 2 * Det(ax, ay, bx, by);
  const numx = Det(ay, ax * ax + ay * ay, by, bx * bx + by * by);
  const numy = Det(ax, ax * ax + ay * ay, bx, bx * bx + by * by);
  return out.set(cx - numx / denom, cy + numy / denom);
}
