/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetLineLength } from "../line/GetLineLength";
import { GetTriangleEdges } from "./GetTriangleEdges";
import { Vec2 } from "../../math/vec2/Vec2";
export function GetTrianglePoint(triangle, position, out = new Vec2()) {
  const [line1, line2, line3] = GetTriangleEdges(triangle);
  if (position <= 0 || position >= 1) {
    return out.set(line1.x1, line1.y1);
  }
  const length1 = GetLineLength(line1);
  const length2 = GetLineLength(line2);
  const length3 = GetLineLength(line3);
  const perimeter = length1 + length2 + length3;
  let p = perimeter * position;
  let localPosition = 0;
  if (p < length1) {
    localPosition = p / length1;
    const { x1, y1, x2, y2 } = line1;
    return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
  } else if (p > length1 + length2) {
    p -= length1 + length2;
    localPosition = p / length3;
    const { x1, y1, x2, y2 } = line3;
    return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
  } else {
    p -= length1;
    localPosition = p / length2;
    const { x1, y1, x2, y2 } = line2;
    return out.set(x1 + (x2 - x1) * localPosition, y1 + (y2 - y1) * localPosition);
  }
}
