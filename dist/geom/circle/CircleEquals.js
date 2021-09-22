/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function CircleEquals(circle, toCompare) {
  return circle.x === toCompare.x && circle.y === toCompare.y && circle.radius === toCompare.radius;
}
