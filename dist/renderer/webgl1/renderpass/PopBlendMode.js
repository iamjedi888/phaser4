import { BindBlendMode } from "./BindBlendMode";
import { BlendModeStack } from "./BlendModeStack";
export function PopBlendMode() {
  BlendModeStack.index--;
  BindBlendMode();
}
