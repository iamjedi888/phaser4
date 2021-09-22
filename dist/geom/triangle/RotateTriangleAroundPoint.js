/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { RotateTriangleAround } from "./RotateTriangleAround";
export function RotateTriangleAroundPoint(triangle, point, angle) {
  return RotateTriangleAround(triangle, point.x, point.y, angle);
}
