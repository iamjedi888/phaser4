/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Vec2 } from "../../math/vec2/Vec2";
export function GetLineRandomPoint(line, out = new Vec2()) {
  const t = Math.random();
  out.x = line.x1 + t * (line.x2 - line.x1);
  out.y = line.y1 + t * (line.y2 - line.y1);
  return out;
}
