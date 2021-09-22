/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function LineToLine(line1, line2, out) {
  const { x1, y1, x2, y2 } = line1;
  const { x1: x3, y1: y3, x2: x4, y2: y4 } = line2;
  const numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  const numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
  const deNom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (deNom === 0) {
    return false;
  }
  const uA = numA / deNom;
  const uB = numB / deNom;
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    if (out) {
      out.set(x1 + uA * (x2 - x1), y1 + uA * (y2 - y1));
    }
    return true;
  }
  return false;
}
