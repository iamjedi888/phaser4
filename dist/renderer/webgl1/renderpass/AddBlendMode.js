import { BlendModeStack } from "./BlendModeStack";
import { gl } from "../GL";
export function AddBlendMode(enable, srcRGB, dstRGB, srcAlpha = gl.SRC_ALPHA, dstAlpha = gl.ONE_MINUS_SRC_ALPHA) {
  const entry = { enable, srcRGB, dstRGB, srcAlpha, dstAlpha };
  BlendModeStack.index++;
  if (BlendModeStack.index === BlendModeStack.stack.length) {
    BlendModeStack.stack.push(entry);
  } else {
    BlendModeStack.stack[BlendModeStack.index] = entry;
  }
  return entry;
}
