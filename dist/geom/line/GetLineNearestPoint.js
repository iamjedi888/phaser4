/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Florian Mertens
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Vec2 } from "../../math/vec2/Vec2";
export function GetLineNearestPoint(line, point, out = new Vec2()) {
  const { x1, y1, x2, y2 } = line;
  const L2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (L2 === 0) {
    return out;
  }
  const r = ((point.x - x1) * (x2 - x1) + (point.y - y1) * (y2 - y1)) / L2;
  out.x = x1 + r * (x2 - x1);
  out.y = y1 + r * (y2 - y1);
  return out;
}
