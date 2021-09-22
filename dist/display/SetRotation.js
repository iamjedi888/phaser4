export function SetRotation(rotation, ...children) {
  children.forEach((child) => {
    child.rotation = rotation;
  });
  return children;
}
