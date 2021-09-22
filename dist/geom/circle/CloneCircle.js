/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Circle } from "./Circle";
export function CloneCircle(source) {
  return new Circle(source.x, source.y, source.radius);
}
