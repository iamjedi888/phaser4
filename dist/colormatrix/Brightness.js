import { DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
export function Brightness(gameObject, value, multiply = false) {
  const b = value;
  const values = [
    b,
    0,
    0,
    0,
    0,
    b,
    0,
    0,
    0,
    0,
    b,
    0,
    0,
    0,
    0,
    1
  ];
  if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply)) {
    gameObject.color.colorMatrixEnabled = true;
  }
  return gameObject;
}
