/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {TranslateLine} from "./TranslateLine";
export function TranslateLinePoint(line, v) {
  return TranslateLine(line, v.x, v.y);
}
