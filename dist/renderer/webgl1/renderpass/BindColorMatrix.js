import { ColorMatrixStack } from "./ColorMatrixStack";
import { CurrentColorMatrix } from "./CurrentColorMatrix";
import { CurrentShader } from "./CurrentShader";
import { Flush } from "./Flush";
import { SetUniform } from "../shaders/SetUniform";
export function BindColorMatrix(entry) {
  if (!entry) {
    entry = CurrentColorMatrix();
  }
  const shader = CurrentShader().shader;
  Flush(ColorMatrixStack.renderPass);
  SetUniform(shader, "uColorMatrix", entry.colorMatrix);
  SetUniform(shader, "uColorOffset", entry.colorOffset);
}
