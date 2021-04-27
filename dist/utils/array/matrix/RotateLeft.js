/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {RotateMatrix} from "./RotateMatrix";
export function RotateLeft(matrix) {
  return RotateMatrix(matrix, 90);
}
