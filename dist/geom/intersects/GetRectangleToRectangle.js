/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetLineToRectangle } from "./GetLineToRectangle";
import { GetRectangleEdges } from "../rectangle/GetRectangleEdges";
import { RectangleToRectangle } from "./RectangleToRectangle";
export function GetRectangleToRectangle(rectA, rectB, out = []) {
  if (RectangleToRectangle(rectA, rectB)) {
    const [lineA, lineB, lineC, lineD] = GetRectangleEdges(rectA);
    GetLineToRectangle(lineA, rectB, out);
    GetLineToRectangle(lineB, rectB, out);
    GetLineToRectangle(lineC, rectB, out);
    GetLineToRectangle(lineD, rectB, out);
  }
  return out;
}
