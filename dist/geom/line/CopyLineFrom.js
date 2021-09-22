/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function CopyLineFrom(source, dest) {
  return dest.set(source.x1, source.y1, source.x2, source.y2);
}
