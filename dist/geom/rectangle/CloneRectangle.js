/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Rectangle} from "./Rectangle";
export function CloneRectangle(source) {
  return new Rectangle(source.x, source.y, source.width, source.height);
}
