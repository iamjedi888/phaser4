export function SetValue(property, value, ...children) {
  children.forEach((child) => {
    if (property in child) {
      child[property] = value;
    }
  });
  return children;
}
