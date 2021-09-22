import { BindColorMatrix } from "./BindColorMatrix";
import { ColorMatrixStack } from "./ColorMatrixStack";
export function PopColorMatrix() {
  ColorMatrixStack.index--;
  BindColorMatrix();
}
