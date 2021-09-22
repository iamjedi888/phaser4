/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function IsSizePowerOfTwo(width, height) {
  if (width < 1 || height < 1) {
    return false;
  }
  return (width & width - 1) === 0 && (height & height - 1) === 0;
}
