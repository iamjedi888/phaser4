/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export function TransposeMatrix(matrix) {
  const sourceRowCount = matrix.length;
  const sourceColCount = matrix[0].length;
  const result = new Array(sourceColCount);
  for (let i = 0; i < sourceColCount; i++) {
    result[i] = new Array(sourceRowCount);
    for (let j = sourceRowCount - 1; j > -1; j--) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
}
