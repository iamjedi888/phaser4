import { SetColorMatrix } from "./SetColorMatrix";
export function SetColor(renderPass, color) {
  if (color.colorMatrixEnabled && color.willColorChildren) {
    SetColorMatrix(color);
  }
}
