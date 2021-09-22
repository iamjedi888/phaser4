import { ColorMatrixStack } from "./ColorMatrixStack";
export function SetDefaultColorMatrix(colorMatrix, colorOffset) {
  const entry = { colorMatrix, colorOffset };
  ColorMatrixStack.stack[0] = entry;
  ColorMatrixStack.index = 0;
  ColorMatrixStack.default = entry;
}
