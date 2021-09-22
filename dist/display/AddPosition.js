export function AddPosition(x, y, ...children) {
  children.forEach((child) => {
    child.x += x;
    child.y += y;
  });
  return children;
}
