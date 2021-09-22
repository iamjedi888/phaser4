/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function SmootherStep(x, min, max) {
  x = Math.max(0, Math.min(1, (x - min) / (max - min)));
  return x * x * x * (x * (x * 6 - 15) + 10);
}
