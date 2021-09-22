/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TranslateRectangle(rect, x, y) {
  rect.x += x;
  rect.y += y;
  return rect;
}
