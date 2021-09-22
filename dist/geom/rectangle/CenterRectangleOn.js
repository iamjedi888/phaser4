/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function CenterRectangleOn(rect, x, y) {
  rect.x = x - rect.width / 2;
  rect.y = y - rect.height / 2;
  return rect;
}
