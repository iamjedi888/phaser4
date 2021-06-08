import { BindViewport } from "./BindViewport";
export function PopViewport(renderPass) {
  const stack = renderPass.viewportStack;
  if (stack.length > 1) {
    stack.pop();
  }
  renderPass.currentViewport = stack[stack.length - 1];
  BindViewport(renderPass);
}
