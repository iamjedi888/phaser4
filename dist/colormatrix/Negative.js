import { DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
const values = [
  -1,
  0,
  0,
  1,
  0,
  -1,
  0,
  1,
  0,
  0,
  -1,
  1,
  0,
  0,
  0,
  1
];
export function Negative(gameObject, multiply = false) {
  if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply)) {
    gameObject.color.colorMatrixEnabled = true;
  }
  return gameObject;
}
