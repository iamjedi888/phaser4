/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { SmoothStep } from "../SmoothStep";
export function SmoothStepInterpolation(t, min, max) {
  return min + (max - min) * SmoothStep(t, 0, 1);
}
