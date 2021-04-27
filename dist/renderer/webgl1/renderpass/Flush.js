import {Draw} from "./Draw";
export function Flush(renderPass, forceCount) {
  if (forceCount) {
    renderPass.count = forceCount;
  }
  const count = renderPass.count;
  if (count === 0) {
    return false;
  }
  Draw(renderPass);
  renderPass.prevCount = count;
  renderPass.count = 0;
  renderPass.flushTotal++;
  return true;
}
