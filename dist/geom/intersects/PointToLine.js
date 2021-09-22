/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Florian Mertens
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function PointToLine(point, line, lineThickness = 1) {
  const { x1, y1, x2, y2 } = line;
  const { x: px, y: py } = point;
  const L2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (L2 === 0) {
    return false;
  }
  const r = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / L2;
  if (r < 0) {
    return Math.sqrt((x1 - px) * (x1 - px) + (y1 - py) * (y1 - py)) <= lineThickness;
  } else if (r >= 0 && r <= 1) {
    const s = ((y1 - py) * (x2 - x1) - (x1 - px) * (y2 - y1)) / L2;
    return Math.abs(s) * Math.sqrt(L2) <= lineThickness;
  } else {
    return Math.sqrt((x2 - px) * (x2 - px) + (y2 - py) * (y2 - py)) <= lineThickness;
  }
}
