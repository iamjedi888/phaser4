/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetLineToCircle} from "./GetLineToCircle";
import {GetTriangleEdges} from "../triangle/GetTriangleEdges";
import {TriangleToCircle} from "./TriangleToCircle";
export function GetTriangleToCircle(triangle, circle, out = []) {
  if (TriangleToCircle(triangle, circle)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangle);
    GetLineToCircle(lineA, circle, out);
    GetLineToCircle(lineB, circle, out);
    GetLineToCircle(lineC, circle, out);
  }
  return out;
}
