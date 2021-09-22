import { DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
export function Night(gameObject, intensity = 0.1, multiply = false) {
  const values = [
    intensity * -2,
    -intensity,
    0,
    0,
    -intensity,
    0,
    intensity,
    0,
    0,
    intensity,
    intensity * 2,
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
