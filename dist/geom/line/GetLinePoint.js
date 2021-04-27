/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Vec2} from "../../math/vec2/Vec2";
export function GetLinePoint(line, position, out = new Vec2()) {
  out.x = line.x1 + (line.x2 - line.x1) * position;
  out.y = line.y1 + (line.y2 - line.y1) * position;
  return out;
}
