/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function RectangleSizeEquals(rect, toCompare) {
  return rect.width === toCompare.width && rect.height === toCompare.height;
}
