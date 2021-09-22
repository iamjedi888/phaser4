/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function CircleContains(circle, x, y) {
  if (circle.radius > 0 && x >= circle.left && x <= circle.right && y >= circle.top && y <= circle.bottom) {
    const dx = (circle.x - x) * (circle.x - x);
    const dy = (circle.y - y) * (circle.y - y);
    return dx + dy <= circle.radius * circle.radius;
  } else {
    return false;
  }
}
