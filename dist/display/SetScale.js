export function SetScale(scaleX, scaleY, ...children) {
  children.forEach((child) => {
    child.scale.set(scaleX, scaleY);
  });
  return children;
}
