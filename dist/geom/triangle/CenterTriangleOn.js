/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetTriangleCentroid} from "./GetTriangleCentroid";
import {TranslateTriangle} from "./TranslateTriangle";
export function CenterTriangleOn(triangle, x, y, centerFunc = GetTriangleCentroid) {
  const center = centerFunc(triangle);
  const diffX = x - center.x;
  const diffY = y - center.y;
  return TranslateTriangle(triangle, diffX, diffY);
}
