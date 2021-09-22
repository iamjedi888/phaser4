/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function GetEllipseArea(ellipse) {
  if (ellipse.width <= 0 || ellipse.height <= 0) {
    return 0;
  }
  return ellipse.getMajorRadius() * ellipse.getMinorRadius() * Math.PI;
}
