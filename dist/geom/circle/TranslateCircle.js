/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TranslateCircle(circle, x, y) {
  circle.x += x;
  circle.y += y;
  return circle;
}
