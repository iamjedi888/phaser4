/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {GetRectangleAspectRatio} from "./GetRectangleAspectRatio";
import {GetRectangleCenterX} from "./GetRectangleCenterX";
import {GetRectangleCenterY} from "./GetRectangleCenterY";
export function FitRectangleOutside(target, source) {
  const ratio = GetRectangleAspectRatio(target);
  let width = source.width;
  let height = source.height;
  if (ratio > GetRectangleAspectRatio(source)) {
    width = source.height * ratio;
  } else {
    height = source.width / ratio;
  }
  return target.set(GetRectangleCenterX(source) - target.width / 2, GetRectangleCenterY(source) - target.height / 2, width, height);
}
