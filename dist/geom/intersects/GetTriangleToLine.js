/**
 * @author       Florian Vazelle
 * @author       Geoffrey Glaive
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetTriangleEdges } from "../triangle/GetTriangleEdges";
import { LineToLine } from "./LineToLine";
import { TriangleToLine } from "./TriangleToLine";
import { Vec2 } from "../../math/vec2/Vec2";
export function GetTriangleToLine(triangle, line, out = []) {
  if (TriangleToLine(triangle, line)) {
    const [lineA, lineB, lineC] = GetTriangleEdges(triangle);
    const points = [new Vec2(), new Vec2(), new Vec2()];
    const results = [
      LineToLine(lineA, line, points[0]),
      LineToLine(lineB, line, points[1]),
      LineToLine(lineC, line, points[2])
    ];
    for (let i = 0; i < results.length; i++) {
      if (results[i]) {
        out.push(points[i]);
      }
    }
  }
  return out;
}
