/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetLineToRectangle } from "./GetLineToRectangle";
import { GetTriangleEdges } from "../triangle/GetTriangleEdges";
import { RectangleToTriangle } from "./RectangleToTriangle";
export function GetRectangleToTriangle(rect, triangle, out = []) {
  if (RectangleToTriangle(rect, triangle)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangle);
    GetLineToRectangle(lineA, rect, out);
    GetLineToRectangle(lineB, rect, out);
    GetLineToRectangle(lineC, rect, out);
  }
  return out;
}
