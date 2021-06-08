/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function LineToRectangle(line, rect) {
  const { x1, y1, x2, y2 } = line;
  const { x, y, right, bottom } = rect;
  let t = 0;
  if (x1 >= x && x1 <= right && y1 >= y && y1 <= bottom || x2 >= x && x2 <= right && y2 >= y && y2 <= bottom) {
    return true;
  }
  if (x1 < x && x2 >= x) {
    t = y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    if (t > y && t <= bottom) {
      return true;
    }
  } else if (x1 > right && x2 <= right) {
    t = y1 + (y2 - y1) * (right - x1) / (x2 - x1);
    if (t >= y && t <= bottom) {
      return true;
    }
  }
  if (y1 < y && y2 >= y) {
    t = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
    if (t >= x && t <= right) {
      return true;
    }
  } else if (y1 > bottom && y2 <= bottom) {
    t = x1 + (x2 - x1) * (bottom - y1) / (y2 - y1);
    if (t >= x && t <= right) {
      return true;
    }
  }
  return false;
}
