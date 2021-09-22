/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function Percent(value, min, max, upperMax) {
  if (max === void 0) {
    max = min + 1;
  }
  let percentage = (value - min) / (max - min);
  if (percentage > 1) {
    if (upperMax !== void 0) {
      percentage = (upperMax - value) / (upperMax - max);
      if (percentage < 0) {
        percentage = 0;
      }
    } else {
      percentage = 1;
    }
  } else if (percentage < 0) {
    percentage = 0;
  }
  return percentage;
}
