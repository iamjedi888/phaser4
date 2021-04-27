/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Linear} from "../Linear";
export function LinearInterpolation(v, k) {
  const m = v.length - 1;
  const f = m * k;
  const i = Math.floor(f);
  if (k < 0) {
    return Linear(v[0], v[1], f);
  } else if (k > 1) {
    return Linear(v[m], v[m - 1], m - f);
  } else {
    return Linear(v[i], v[i + 1 > m ? m : i + 1], f - i);
  }
}
