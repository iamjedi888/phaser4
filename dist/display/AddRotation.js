export function AddRotation(rotation, ...children) {
  children.forEach((child) => {
    child.rotation += rotation;
  });
  return children;
}
