import { BlendModeStack } from "./BlendModeStack";
export function CurrentBlendMode() {
  return BlendModeStack.stack[BlendModeStack.index];
}
