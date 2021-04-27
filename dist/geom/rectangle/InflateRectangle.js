/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {CenterRectangleOn} from "./CenterRectangleOn";
import {GetRectangleCenterX} from "./GetRectangleCenterX";
import {GetRectangleCenterY} from "./GetRectangleCenterY";
export function InflateRectangle(rect, x, y) {
  const cx = GetRectangleCenterX(rect);
  const cy = GetRectangleCenterY(rect);
  rect.width = rect.width + x * 2;
  rect.height = rect.height + y * 2;
  return CenterRectangleOn(rect, cx, cy);
}
