/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Wrap } from "../Wrap";
export function WrapAngle(angle) {
  return Wrap(angle, -Math.PI, Math.PI);
}
