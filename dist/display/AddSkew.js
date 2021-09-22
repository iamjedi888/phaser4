export function AddSkew(skewX, skewY, ...children) {
  children.forEach((child) => {
    child.skew.x += skewX;
    child.skew.y += skewY;
  });
  return children;
}
