/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { NormalizeAngle } from "./NormalizeAngle";
export function ReverseAngle(angle) {
  return NormalizeAngle(angle + Math.PI);
}
