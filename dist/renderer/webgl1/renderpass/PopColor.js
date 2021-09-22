import { PopColorMatrix } from "./PopColorMatrix";
export function PopColor(renderPass, color) {
  if (color.colorMatrixEnabled && color.willColorChildren) {
    PopColorMatrix();
  }
}
