import { BlendModeStack } from "./BlendModeStack";
import { gl } from "../GL";
export function SetDefaultBlendMode(enable, srcRGB, dstRGB, srcAlpha = gl.SRC_ALPHA, dstAlpha = gl.ONE_MINUS_SRC_ALPHA) {
  const entry = { enable, srcRGB, dstRGB, srcAlpha, dstAlpha };
  BlendModeStack.stack[0] = entry;
  BlendModeStack.index = 0;
  BlendModeStack.default = entry;
}
