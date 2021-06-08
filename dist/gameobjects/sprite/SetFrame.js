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
      child.setOrigin(pivot.x, pivot.y);
    }
    frame.copyToExtent(child);
    frame.copyToVertices(child.id);
  });
  return children;
}
