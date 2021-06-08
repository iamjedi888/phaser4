/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Wrap } from "../Wrap";
export function WrapAngleDegrees(angle) {
  return Wrap(angle, -180, 180);
}
