/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function FitRectangleToPoints(target, points) {
  let minX = target.x;
  let maxX = target.right;
  let minY = target.y;
  let maxY = target.bottom;
  for (let i = 0; i < points.length; i++) {
    minX = Math.min(minX, points[i].x);
    maxX = Math.max(maxX, points[i].x);
    minY = Math.min(minY, points[i].y);
    maxY = Math.max(maxY, points[i].y);
  }
  return target.set(minX, minY, maxX - minX, maxY - minY);
}
