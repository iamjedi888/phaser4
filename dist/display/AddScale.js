export function AddScale(scaleX, scaleY, ...children) {
  children.forEach((child) => {
    child.scale.x += scaleX;
    child.scale.y += scaleY;
  });
  return children;
}
