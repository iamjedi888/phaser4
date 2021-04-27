export function Mat2dITRSS(target, x, y, angle = 0, scaleX = 1, scaleY = 1, skewX = 0, skewY = 0) {
  if (angle === 0) {
    return target.set(1, 0, 0, 1, x, y);
  } else {
    return target.set(Math.cos(angle + skewY) * scaleX, Math.sin(angle + skewY) * scaleX, -Math.sin(angle - skewX) * scaleY, Math.cos(angle - skewX) * scaleY, x, y);
  }
}
