/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Clamp} from "./Clamp";
export function FromPercent(percent, min, max) {
  percent = Clamp(percent, 0, 1);
  return (max - min) * percent;
}
