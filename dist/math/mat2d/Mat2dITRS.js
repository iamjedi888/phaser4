export function Mat2dITRS(target, x, y, angle, scaleX, scaleY) {
  if (angle === 0) {
    return target.set(1, 0, 0, 1, x, y);
  } else {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return target.set(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
  }
}
