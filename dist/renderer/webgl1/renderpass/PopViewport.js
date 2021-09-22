import { BindViewport } from "./BindViewport";
import { ViewportStack } from "./ViewportStack";
export function PopViewport() {
  ViewportStack.index--;
  BindViewport();
}
