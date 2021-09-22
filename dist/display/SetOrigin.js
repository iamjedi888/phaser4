export function SetOrigin(originX, originY, ...children) {
  children.forEach((child) => {
    child.origin.set(originX, originY);
  });
  return children;
}
