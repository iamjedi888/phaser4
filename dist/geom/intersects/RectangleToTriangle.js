/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { DecomposeRectangle } from "../rectangle/DecomposeRectangle";
import { GetRectangleEdges } from "../rectangle/GetRectangleEdges";
import { GetTriangleEdges } from "../triangle/GetTriangleEdges";
import { LineToLine } from "./LineToLine";
import { RectangleContains } from "../rectangle/RectangleContains";
import { TriangleContainsPoints } from "../triangle/TriangleContainsPoints";
export function RectangleToTriangle(rect, triangle) {
  if (triangle.left > rect.right || triangle.right < rect.x || triangle.top > rect.bottom || triangle.bottom < rect.y) {
    return false;
  }
  const [triA, triB, triC] = GetTriangleEdges(triangle);
  if (RectangleContains(rect, triA.x1, triA.y1) || RectangleContains(rect, triA.x2, triA.y2)) {
    return true;
  }
  if (RectangleContains(rect, triB.x1, triB.y1) || RectangleContains(rect, triB.x2, triB.y2)) {
    return true;
  }
  if (RectangleContains(rect, triC.x1, triC.y1) || RectangleContains(rect, triC.x2, triC.y2)) {
    return true;
  }
  const [rectA, rectB, rectC, rectD] = GetRectangleEdges(rect);
  if (LineToLine(triA, rectA) || LineToLine(triA, rectB) || LineToLine(triA, rectC) || LineToLine(triA, rectD)) {
    return true;
  }
  if (LineToLine(triB, rectA) || LineToLine(triB, rectB) || LineToLine(triB, rectC) || LineToLine(triB, rectD)) {
    return true;
  }
  if (LineToLine(triC, rectA) || LineToLine(triC, rectB) || LineToLine(triC, rectC) || LineToLine(triC, rectD)) {
    return true;
  }
  const within = TriangleContainsPoints(triangle, DecomposeRectangle(rect), true);
  return within.length > 0;
}
