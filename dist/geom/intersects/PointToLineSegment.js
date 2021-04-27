/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {PointToLine} from "./PointToLine";
export function PointToLineSegment(point, line) {
  if (!PointToLine(point, line)) {
    return false;
  }
  const {x1, y1, x2, y2} = line;
  const {x, y} = point;
  const xMin = Math.min(x1, x2);
  const xMax = Math.max(x1, x2);
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);
  return x >= xMin && x <= xMax && (y >= yMin && y <= yMax);
}
