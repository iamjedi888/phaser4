export function UpdateLocalTransform(localTransform, transformData) {
  const [x, y, rotation, scaleX, scaleY, skewX, skewY] = transformData;
  localTransform.set(Math.cos(rotation + skewY) * scaleX, Math.sin(rotation + skewY) * scaleX, -Math.sin(rotation - skewX) * scaleY, Math.cos(rotation - skewX) * scaleY, x, y);
}
