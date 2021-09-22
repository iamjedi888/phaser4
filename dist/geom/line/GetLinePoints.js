/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { GetLineLength } from "./GetLineLength";
import { Vec2 } from "../../math/vec2/Vec2";
export function GetLinePoints(line, quantity, stepRate = 0, out = []) {
  if (!quantity) {
    quantity = GetLineLength(line) / stepRate;
  }
  const { x1, y1, x2, y2 } = line;
  for (let i = 0; i < quantity; i++) {
    const position = i / quantity;
    const x = x1 + (x2 - x1) * position;
    const y = y1 + (y2 - y1) * position;
    out.push(new Vec2(x, y));
  }
  return out;
}
