import { BindColorMatrix } from "./BindColorMatrix";
import { ColorMatrixStack } from "./ColorMatrixStack";
export function BindDefaultColorMatrix() {
  ColorMatrixStack.index = 0;
  BindColorMatrix(ColorMatrixStack.default);
}
