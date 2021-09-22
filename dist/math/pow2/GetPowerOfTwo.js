/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function GetPowerOfTwo(value) {
  const index = Math.log(value) / 0.6931471805599453;
  return 1 << Math.ceil(index);
}
