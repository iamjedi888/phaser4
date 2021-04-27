/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Triangle} from "./Triangle";
export function BuildRightTriangle(x, y, width, height = width) {
  const x1 = x;
  const y1 = y;
  const x2 = x;
  const y2 = y - height;
  const x3 = x + width;
  const y3 = y;
  return new Triangle(x1, y1, x2, y2, x3, y3);
}
