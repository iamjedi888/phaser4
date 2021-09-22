import { DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
const values = [
  2,
  -0.4,
  0.5,
  0,
  -0.5,
  2,
  -0.4,
  0,
  -0.4,
  -0.5,
  3,
  0,
  0,
  0,
  0,
  1
];
export function LSD(gameObject, multiply = false) {
  if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply)) {
    gameObject.color.colorMatrixEnabled = true;
  }
  return gameObject;
}
