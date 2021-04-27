/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Rectangle} from "../rectangle/Rectangle";
export function GetEllipseBounds(ellipse, out = new Rectangle()) {
  return out.set(ellipse.left, ellipse.top, ellipse.width, ellipse.height);
}
