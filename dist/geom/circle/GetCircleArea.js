/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function GetCircleArea(circle) {
  return circle.radius > 0 ? Math.PI * circle.radius * circle.radius : 0;
}
