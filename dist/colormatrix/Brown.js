import { SetColorMatrix } from "./SetColorMatrix";
const values = [
  0.5997023498159715,
  0.34553243048391263,
  -0.2708298674538042,
  0,
  -0.037703249837783157,
  0.8609577587992641,
  0.15059552388459913,
  0,
  0.24113635128153335,
  -0.07441037908422492,
  0.44972182064877153,
  0,
  0,
  0,
  0,
  1
];
const offsets = [
  47.43192855600873,
  -36.96841498319127,
  -7.562075277591283,
  0
];
export function Brown(gameObject, multiply = false) {
  if (SetColorMatrix(gameObject.id, values, offsets, multiply)) {
    gameObject.color.colorMatrixEnabled = true;
  }
  return gameObject;
}
