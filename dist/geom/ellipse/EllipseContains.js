/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function EllipseContains(ellipse, x, y) {
  if (ellipse.width <= 0 || ellipse.height <= 0) {
    return false;
  }
  let normx = (x - ellipse.x) / ellipse.width;
  let normy = (y - ellipse.y) / ellipse.height;
  normx *= normx;
  normy *= normy;
  return normx + normy < 0.25;
}
