/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { RoundAwayFromZero } from "../../math/RoundAwayFromZero";
export function NumberArrayStep(start, end, step) {
  const result = [];
  const total = Math.max(RoundAwayFromZero((end - start) / (step || 1)), 0);
  for (let i = 0; i < total; i++) {
    result.push(start);
    start += step;
  }
  return result;
}
