import { DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
export function Reset(gameObject) {
  if (SetColorMatrix(gameObject.id, DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET, false)) {
    gameObject.color.colorMatrixEnabled = false;
  }
  return gameObject;
}
