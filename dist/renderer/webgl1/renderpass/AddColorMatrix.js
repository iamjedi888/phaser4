import { ColorMatrixStack } from "./ColorMatrixStack";
export function AddColorMatrix(colorMatrix, colorOffset) {
  const entry = { colorMatrix, colorOffset };
  ColorMatrixStack.index++;
  if (ColorMatrixStack.index === ColorMatrixStack.stack.length) {
    ColorMatrixStack.stack.push(entry);
  } else {
    ColorMatrixStack.stack[ColorMatrixStack.index] = entry;
  }
  return entry;
}
