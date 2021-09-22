import { ViewportStack } from "./ViewportStack";
export function CurrentViewport() {
  return ViewportStack.stack[ViewportStack.index];
}
