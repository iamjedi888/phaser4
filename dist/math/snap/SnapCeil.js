/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function SnapCeil(value, gap, start = 0, divide = false) {
  if (gap === 0) {
    return value;
  }
  value -= start;
  value = gap * Math.ceil(value / gap);
  return divide ? (start + value) / gap : start + value;
}
