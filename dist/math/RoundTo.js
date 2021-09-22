/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function RoundTo(value, place = 0, base = 10) {
  const p = Math.pow(base, -place);
  return Math.round(value * p) / p;
}
