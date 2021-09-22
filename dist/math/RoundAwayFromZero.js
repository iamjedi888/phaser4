/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function RoundAwayFromZero(value) {
  return value > 0 ? Math.ceil(value) : Math.floor(value);
}
