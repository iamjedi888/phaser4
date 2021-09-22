/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function FloorRectanglePosition(rect) {
  rect.x = Math.floor(rect.x);
  rect.y = Math.floor(rect.y);
  return rect;
}
