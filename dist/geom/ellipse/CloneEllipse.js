/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Ellipse } from "./Ellipse";
export function CloneEllipse(source) {
  return new Ellipse(source.x, source.y, source.width, source.height);
}
