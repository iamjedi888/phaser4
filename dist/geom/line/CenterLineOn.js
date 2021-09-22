/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function CenterLineOn(line, x, y) {
  const tx = x - (line.x1 + line.x2) / 2;
  const ty = y - (line.y1 + line.y2) / 2;
  line.x1 += tx;
  line.y1 += ty;
  line.x2 += tx;
  line.y2 += ty;
  return line;
}
