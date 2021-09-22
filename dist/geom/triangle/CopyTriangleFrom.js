/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function CopyTriangleFrom(source, dest) {
  const { x1, y1, x2, y2, x3, y3 } = source;
  return dest.set(x1, y1, x2, y2, x3, y3);
}
