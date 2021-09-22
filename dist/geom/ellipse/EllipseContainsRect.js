/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { EllipseContains } from "./EllipseContains";
export function EllipseContainsRect(ellipse, rect) {
  return EllipseContains(ellipse, rect.x, rect.y) && EllipseContains(ellipse, rect.right, rect.y) && EllipseContains(ellipse, rect.x, rect.bottom) && EllipseContains(ellipse, rect.right, rect.bottom);
}
