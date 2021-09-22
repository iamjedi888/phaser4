/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TranslateRectanglePoint(rect, point) {
  rect.x += point.x;
  rect.y += point.y;
  return rect;
}
