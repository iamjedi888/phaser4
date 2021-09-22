/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function ShortestAngleBetween(angle1, angle2) {
  const difference = angle2 - angle1;
  if (difference === 0) {
    return 0;
  }
  const times = Math.floor((difference - -180) / 360);
  return difference - times * 360;
}
