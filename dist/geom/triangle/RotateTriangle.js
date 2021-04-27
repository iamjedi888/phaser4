/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetTriangleInCenter} from "./GetTriangleInCenter";
import {RotateTriangleAround} from "./RotateTriangleAround";
export function RotateTriangle(triangle, angle) {
  const point = GetTriangleInCenter(triangle);
  return RotateTriangleAround(triangle, point.x, point.y, angle);
}
