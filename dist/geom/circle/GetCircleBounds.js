/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Rectangle } from "../rectangle/Rectangle";
export function GetCircleBounds(circle, out = new Rectangle()) {
  return out.set(circle.left, circle.top, circle.diameter, circle.diameter);
}
