/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TranslateTriangle(triangle, x, y) {
  triangle.x1 += x;
  triangle.y1 += y;
  triangle.x2 += x;
  triangle.y2 += y;
  triangle.x3 += x;
  triangle.y3 += y;
  return triangle;
}
