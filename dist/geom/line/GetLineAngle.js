/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function GetLineAngle(line) {
  return Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
}
