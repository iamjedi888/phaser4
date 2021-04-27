/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Vec2} from "../../math/vec2/Vec2";
export function GetLineBresenhamPoints(line, stepRate = 1, results = []) {
  let x1 = Math.round(line.x1);
  let y1 = Math.round(line.y1);
  const x2 = Math.round(line.x2);
  const y2 = Math.round(line.y2);
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;
  results.push(new Vec2(x1, y1));
  let i = 1;
  while (!(x1 === x2 && y1 === y2)) {
    const e2 = err << 1;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
    if (i % stepRate === 0) {
      results.push(new Vec2(x1, y1));
    }
    i++;
  }
  return results;
}
