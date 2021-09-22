/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { Line } from "./Line";
export function CloneLine(source) {
  return new Line(source.x1, source.y1, source.x2, source.y2);
}
