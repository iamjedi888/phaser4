import { AddBlendMode } from "./AddBlendMode";
import { BindBlendMode } from "./BindBlendMode";
import { gl } from "../GL";
export function SetBlendMode(enable, srcRGB, dstRGB, srcAlpha = gl.SRC_ALPHA, dstAlpha = gl.ONE_MINUS_SRC_ALPHA) {
  const entry = AddBlendMode(enable, srcRGB, dstRGB, srcAlpha, dstAlpha);
  BindBlendMode(entry);
}
