export function SetPosition(x, y, ...children) {
  children.forEach((child) => {
    child.position.set(x, y);
  });
  return children;
}
