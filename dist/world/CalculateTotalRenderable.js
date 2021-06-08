import { IsDirtyFrame } from "../components/dirty";
export function CalculateTotalRenderable(entry, renderData) {
  renderData.numRendered++;
  renderData.numRenderable++;
  if (IsDirtyFrame(entry.node.id, renderData.gameFrame)) {
    renderData.dirtyFrame++;
  }
  entry.children.forEach((child) => {
    if (child.children.length > 0) {
      CalculateTotalRenderable(child, renderData);
    }
  });
}
