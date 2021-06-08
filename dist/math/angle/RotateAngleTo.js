/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { MATH_CONST } from "../const";
export function RotateAngleTo(currentAngle, targetAngle, lerp = 0.05) {
  if (currentAngle === targetAngle) {
    return currentAngle;
  }
  if (Math.abs(targetAngle - currentAngle) <= lerp || Math.abs(targetAngle - currentAngle) >= MATH_CONST.PI2 - lerp) {
    currentAngle = targetAngle;
  } else {
    if (Math.abs(targetAngle - currentAngle) > Math.PI) {
      if (targetAngle < currentAngle) {
        targetAngle += MATH_CONST.PI2;
      } else {
        targetAngle -= MATH_CONST.PI2;
      }
    }
    if (targetAngle > currentAngle) {
      currentAngle += lerp;
    } else if (targetAngle < currentAngle) {
      currentAngle -= lerp;
    }
  }
  return currentAngle;
}
