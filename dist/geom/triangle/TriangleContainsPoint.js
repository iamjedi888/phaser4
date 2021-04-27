/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {TriangleContains} from "./TriangleContains";
export function TriangleContainsPoint(triangle, point) {
  return TriangleContains(triangle, point.x, point.y);
}
