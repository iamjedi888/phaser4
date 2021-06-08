import { Color } from "./Color";
import { SetHSV } from "./SetHSV";
export function FromHSV(h, s = 1, v = 1) {
  return SetHSV(new Color(), h, s, v);
}
