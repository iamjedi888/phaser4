/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetLineAngle} from "./GetLineAngle";
import {GetLineNormalAngle} from "./GetLineNormalAngle";
export function GetLineReflectAngle(lineA, lineB) {
  return 2 * GetLineNormalAngle(lineB) - Math.PI - GetLineAngle(lineA);
}
