import { DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
const values = [
  1.438,
  -0.062,
  -0.062,
  0,
  -0.122,
  1.378,
  -0.122,
  0,
  -0.016,
  -0.016,
  1.483,
  0,
  0,
  0,
  0,
  1
];
export function Polaroid(gameObject, multiply = false) {
  if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply)) {
    gameObject.color.colorMatrixEnabled = true;
  }
  return gameObject;
}
