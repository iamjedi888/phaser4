export function SetSkew(skewX, skewY, ...children) {
  children.forEach((child) => {
    child.skew.set(skewX, skewY);
  });
  return children;
}
