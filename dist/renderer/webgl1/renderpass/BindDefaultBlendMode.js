import { BindBlendMode } from "./BindBlendMode";
import { BlendModeStack } from "./BlendModeStack";
export function BindDefaultBlendMode() {
  BlendModeStack.index = 0;
  BindBlendMode(BlendModeStack.default);
}
