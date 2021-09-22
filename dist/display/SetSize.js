export function SetSize(width, height, ...children) {
  children.forEach((child) => {
    child.size.set(width, height);
  });
  return children;
}
