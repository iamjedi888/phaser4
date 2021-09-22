/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function Wrap(value, min, max) {
  const range = max - min;
  return min + ((value - min) % range + range) % range;
}
