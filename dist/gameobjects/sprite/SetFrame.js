import { SetExtentFromFrame } from "../../textures/SetExtentFromFrame";
import { SetVertexUVsFromFrame } from "../../textures/SetVertexUVsFromFrame";
export function SetFrame(texture, key, ...children) {
  const frame = texture.getFrame(key);
  const pivot = frame.pivot;
  children.forEach((child) => {
    if (!child || frame === child.frame) {
      return;
    }
    child.frame = frame;
    child.hasTexture = true;
    if (pivot) {
      child.origin.set(pivot.x, pivot.y);
    }
    SetExtentFromFrame(child, frame);
    SetVertexUVsFromFrame(child.id, frame);
  });
  return children;
}
