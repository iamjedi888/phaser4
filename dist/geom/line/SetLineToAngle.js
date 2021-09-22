/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function SetLineToAngle(line, x, y, angle, length) {
  line.x1 = x;
  line.y1 = y;
  line.x2 = x + Math.cos(angle) * length;
  line.y2 = y + Math.sin(angle) * length;
  return line;
}
