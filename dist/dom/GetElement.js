/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function GetElement(target) {
  let element;
  if (target) {
    if (typeof target === "string") {
      element = document.getElementById(target);
    } else if (typeof target === "object" && target.nodeType === 1) {
      element = target;
    }
  }
  if (!element) {
    element = document.body;
  }
  return element;
}
