/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TranslateCirclePoint(circle, point) {
  circle.x += point.x;
  circle.y += point.y;
  return circle;
}
