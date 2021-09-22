import { BindViewport } from "./BindViewport";
import { ViewportStack } from "./ViewportStack";
export function BindDefaultViewport() {
  ViewportStack.index = 0;
  BindViewport(ViewportStack.default);
}
