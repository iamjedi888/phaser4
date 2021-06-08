/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { CircleToRectangle } from "./CircleToRectangle";
import { GetLineToCircle } from "./GetLineToCircle";
import { GetRectangleEdges } from "../rectangle/GetRectangleEdges";
export function GetCircleToRectangle(circle, rect, out = []) {
  if (CircleToRectangle(circle, rect)) {
    const [line1, line2, line3, line4] = GetRectangleEdges(rect);
    GetLineToCircle(line1, circle, out);
    GetLineToCircle(line2, circle, out);
    GetLineToCircle(line3, circle, out);
    GetLineToCircle(line4, circle, out);
  }
  return out;
}
