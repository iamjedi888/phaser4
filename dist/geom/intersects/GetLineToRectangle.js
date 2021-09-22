/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetRectangleEdges } from "../rectangle/GetRectangleEdges";
import { LineToLine } from "./LineToLine";
import { LineToRectangle } from "./LineToRectangle";
import { Vec2 } from "../../math/vec2/Vec2";
export function GetLineToRectangle(line, rect, out = []) {
  if (LineToRectangle(line, rect)) {
    const [lineA, lineB, lineC, lineD] = GetRectangleEdges(rect);
    const points = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
    const results = [
      LineToLine(lineA, line, points[0]),
      LineToLine(lineB, line, points[1]),
      LineToLine(lineC, line, points[2]),
      LineToLine(lineD, line, points[3])
    ];
    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        out.push(points[i]);
      }
    }
  }
  return out;
}
