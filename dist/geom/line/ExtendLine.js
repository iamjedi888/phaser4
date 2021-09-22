/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetLineLength } from "./GetLineLength";
export function ExtendLine(line, left, right = left) {
  const length = GetLineLength(line);
  const slopX = line.x2 - line.x1;
  const slopY = line.y2 - line.y1;
  if (left) {
    line.x1 = line.x1 - slopX / length * left;
    line.y1 = line.y1 - slopY / length * left;
  }
  if (right) {
    line.x2 = line.x2 + slopX / length * right;
    line.y2 = line.y2 + slopY / length * right;
  }
  return line;
}
