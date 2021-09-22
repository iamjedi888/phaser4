/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function Factorial(value) {
  if (value === 0) {
    return 1;
  }
  let res = value;
  while (--value) {
    res *= value;
  }
  return res;
}
