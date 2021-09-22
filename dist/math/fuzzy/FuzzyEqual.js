/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function FuzzyEqual(a, b, epsilon = 1e-4) {
  return Math.abs(a - b) < epsilon;
}
