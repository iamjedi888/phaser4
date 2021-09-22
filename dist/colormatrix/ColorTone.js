import { DEFAULT_COLOR_OFFSET } from "./const";
import { SetColorMatrix } from "./SetColorMatrix";
export function ColorTone(gameObject, desaturation = 0.2, toned = 0.15, lightColor = 16770432, darkColor = 3375104, multiply = false) {
  const lR = (lightColor >> 16 & 255) / 255;
  const lG = (lightColor >> 8 & 255) / 255;
  const lB = (lightColor & 255) / 255;
  const dR = (darkColor >> 16 & 255) / 255;
  const dG = (darkColor >> 8 & 255) / 255;
  const dB = (darkColor & 255) / 255;
  const values = [
    0.3,
    0.59,
    0.11,
    0,
    lR,
    lG,
    lB,
    desaturation,
    dR,
    dG,
    dB,
    toned,
    lR - dR,
    lG - dG,
    lB - dB,
    0
  ];
  if (SetColorMatrix(gameObject.id, values, DEFAULT_COLOR_OFFSET, multiply)) {
    gameObject.color.colorMatrixEnabled = true;
  }
  return gameObject;
}
