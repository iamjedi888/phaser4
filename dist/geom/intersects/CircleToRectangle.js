/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function CircleToRectangle(circle, rect) {
  const halfWidth = rect.width / 2;
  const halfHeight = rect.height / 2;
  const cx = Math.abs(circle.x - rect.x - halfWidth);
  const cy = Math.abs(circle.y - rect.y - halfHeight);
  const xDist = halfWidth + circle.radius;
  const yDist = halfHeight + circle.radius;
  if (cx > xDist || cy > yDist) {
    return false;
  } else if (cx <= halfWidth || cy <= halfHeight) {
    return true;
  } else {
    const xCornerDist = cx - halfWidth;
    const yCornerDist = cy - halfHeight;
    const xCornerDistSq = xCornerDist * xCornerDist;
    const yCornerDistSq = yCornerDist * yCornerDist;
    const maxCornerDistSq = circle.radius * circle.radius;
    return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
  }
}
