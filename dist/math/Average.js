/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function Average(values) {
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += +values[i];
  }
  return sum / values.length;
}
