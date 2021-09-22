/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TranslateEllipse(ellipse, x, y) {
  ellipse.x += x;
  ellipse.y += y;
  return ellipse;
}
