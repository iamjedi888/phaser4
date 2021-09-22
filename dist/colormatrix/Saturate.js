import { DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
export function Saturate(gameObject, value, multiply = false) {
  const x = value * 2 / 3 + 1;
  const y = (x - 1) * -0.5;
  const values = [
    x,
    y,
    y,
    0,
    y,
    x,
    y,
    0,
    y,
    y,
    x,
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
