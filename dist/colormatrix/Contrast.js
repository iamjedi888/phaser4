import { SetColorMatrix } from "./SetColorMatrix";
export function Contrast(gameObject, value, multiply = false) {
  const v = value + 1;
  const o = -0.5 * (v - 1);
  const values = [
    v,
    0,
    0,
    0,
    0,
    v,
    0,
    0,
    0,
    0,
    v,
    0,
    0,
    0,
    0,
    1
  ];
  if (SetColorMatrix(gameObject.id, values, [o, o, o, 0], multiply)) {
    gameObject.color.colorMatrixEnabled = true;
  }
  return gameObject;
}
