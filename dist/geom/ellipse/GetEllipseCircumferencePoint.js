/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {Vec2} from "../../math/vec2/Vec2";
export function GetEllipseCircumferencePoint(ellipse, angle, out = new Vec2()) {
  const halfWidth = ellipse.width / 2;
  const halfHeight = ellipse.height / 2;
  return out.set(ellipse.x + halfWidth * Math.cos(angle), ellipse.y + halfHeight * Math.sin(angle));
}
