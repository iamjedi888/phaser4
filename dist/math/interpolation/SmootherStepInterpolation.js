/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {SmootherStep} from "../SmootherStep";
export function SmootherStepInterpolation(t, min, max) {
  return min + (max - min) * SmootherStep(t, 0, 1);
}
