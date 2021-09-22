/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function IsValuePowerOfTwo(value) {
  return value > 0 && (value & value - 1) === 0;
}
