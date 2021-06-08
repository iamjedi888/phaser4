/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function RemoveAt(string, index) {
  if (index === 0) {
    return string.slice(1);
  } else {
    return string.slice(0, index - 1) + string.slice(index);
  }
}
