/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { CircleContains } from "./CircleContains";
export function CircleContainsRect(circle, rect) {
  return CircleContains(circle, rect.x, rect.y) && CircleContains(circle, rect.right, rect.y) && CircleContains(circle, rect.x, rect.bottom) && CircleContains(circle, rect.right, rect.bottom);
}
