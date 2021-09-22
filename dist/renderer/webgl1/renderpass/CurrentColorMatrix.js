import { ColorMatrixStack } from "./ColorMatrixStack";
export function CurrentColorMatrix() {
  return ColorMatrixStack.stack[ColorMatrixStack.index];
}
