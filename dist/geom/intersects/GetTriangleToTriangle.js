/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetTriangleEdges } from "../triangle/GetTriangleEdges";
import { GetTriangleToLine } from "./GetTriangleToLine";
import { TriangleToTriangle } from "./TriangleToTriangle";
export function GetTriangleToTriangle(triangleA, triangleB, out = []) {
  if (TriangleToTriangle(triangleA, triangleB)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangleB);
    GetTriangleToLine(triangleA, lineA, out);
    GetTriangleToLine(triangleA, lineB, out);
    GetTriangleToLine(triangleA, lineC, out);
  }
  return out;
}
