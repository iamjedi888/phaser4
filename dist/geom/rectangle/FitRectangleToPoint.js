/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function FitRectangleToPoint(target, x, y) {
  const minX = Math.min(target.x, x);
  const maxX = Math.max(target.right, x);
  const minY = Math.min(target.y, y);
  const maxY = Math.max(target.bottom, y);
  return target.set(minX, minY, maxX - minX, maxY - minY);
}
