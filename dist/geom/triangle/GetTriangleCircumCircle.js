/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Circle } from "../Circle/Circle";
export function GetTriangleCircumCircle(triangle, out = new Circle()) {
  const { x1, y1, x2, y2, x3, y3 } = triangle;
  const A = x2 - x1;
  const B = y2 - y1;
  const C = x3 - x1;
  const D = y3 - y1;
  const E = A * (x1 + x2) + B * (y1 + y2);
  const F = C * (x1 + x3) + D * (y1 + y3);
  const G = 2 * (A * (y3 - y2) - B * (x3 - x2));
  if (Math.abs(G) < 1e-6) {
    const minX = Math.min(x1, x2, x3);
    const minY = Math.min(y1, y2, y3);
    const dx = (Math.max(x1, x2, x3) - minX) * 0.5;
    const dy = (Math.max(y1, y2, y3) - minY) * 0.5;
    return out.set(minX + dx, minY + dy, Math.sqrt(dx * dx + dy * dy));
  } else {
    const cx = (D * E - B * F) / G;
    const cy = (A * F - C * E) / G;
    const dx = cx - x1;
    const dy = cy - y1;
    return out.set(cx, cy, Math.sqrt(dx * dx + dy * dy));
  }
}
