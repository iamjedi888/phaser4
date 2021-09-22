export function SetVisible(visible, ...children) {
  children.forEach((child) => {
    child.visible = visible;
  });
  return children;
}
