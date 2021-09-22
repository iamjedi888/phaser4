/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function ScaleRectangle(rect, x, y = x) {
  rect.width *= x;
  rect.height *= y;
  return rect;
}
