/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import { CheckMatrix } from "./CheckMatrix";
export function MatrixToString(matrix) {
  let str = "";
  if (!CheckMatrix(matrix)) {
    return str;
  }
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      const cell = matrix[r][c].toString();
      if (cell !== "undefined") {
        str = str.padEnd(2, cell);
      } else {
        str += "?";
      }
      if (c < matrix[r].length - 1) {
        str += " |";
      }
    }
    if (r < matrix.length - 1) {
      str += "\n";
      for (let i = 0; i < matrix[r].length; i++) {
        str += "---";
        if (i < matrix[r].length - 1) {
          str += "+";
        }
      }
      str += "\n";
    }
  }
  return str;
}
