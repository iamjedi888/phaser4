/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetRectanglePerimeter } from "./GetRectanglePerimeter";
import { GetRectanglePoint } from "./GetRectanglePoint";
export function GetRectanglePoints(rectangle, step, quantity = 0, out = []) {
  if (!quantity) {
    quantity = GetRectanglePerimeter(rectangle) / step;
  }
  for (let i = 0; i < quantity; i++) {
    out.push(GetRectanglePoint(rectangle, i / quantity));
  }
  return out;
}
