/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Vec2} from "../../math/vec2/Vec2";
export function GetCircleRandomPoint(circle, out = new Vec2()) {
  const t = 2 * Math.PI * Math.random();
  const u = Math.random() + Math.random();
  const r = u > 1 ? 2 - u : u;
  const x = r * Math.cos(t);
  const y = r * Math.sin(t);
  return out.set(circle.x + x * circle.radius, circle.y + y * circle.radius);
}
