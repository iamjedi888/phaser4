import { DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
export function Tint(gameObject, color, multiply = false) {
  const r = color >> 16 & 255;
  const g = color >> 8 & 255;
  const b = color & 255;
  const values = [
    r / 255,
    0,
    0,
    0,
    0,
    g / 255,
    0,
    0,
    0,
    0,
    b / 255,
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
