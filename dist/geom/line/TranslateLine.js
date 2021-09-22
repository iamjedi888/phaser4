/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TranslateLine(line, x, y) {
  line.x1 += x;
  line.y1 += y;
  line.x2 += x;
  line.y2 += y;
  return line;
}
