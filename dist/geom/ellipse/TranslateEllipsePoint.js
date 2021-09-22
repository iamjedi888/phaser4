/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TranslateEllipsePoint(ellipse, point) {
  ellipse.x += point.x;
  ellipse.y += point.y;
  return ellipse;
}
