/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetTriangleEdges} from "../triangle/GetTriangleEdges";
import {LineToCircle} from "./LineToCircle";
import {TriangleContains} from "../triangle/TriangleContains";
export function TriangleToCircle(triangle, circle) {
  if (triangle.left > circle.right || triangle.right < circle.left || triangle.top > circle.bottom || triangle.bottom < circle.top) {
    return false;
  }
  if (TriangleContains(triangle, circle.x, circle.y)) {
    return true;
  }
  const [line1, line2, line3] = GetTriangleEdges(triangle);
  return LineToCircle(line1, circle) || LineToCircle(line2, circle) || LineToCircle(line3, circle);
}
