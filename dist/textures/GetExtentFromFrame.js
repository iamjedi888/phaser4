export function GetExtentFromFrame(frame, originX, originY) {
  const sourceSizeWidth = frame.sourceSizeWidth;
  const sourceSizeHeight = frame.sourceSizeHeight;
  let left;
  let right;
  let top;
  let bottom;
  if (frame.trimmed) {
    left = frame.spriteSourceSizeX - originX * sourceSizeWidth;
    right = left + frame.spriteSourceSizeWidth;
    top = frame.spriteSourceSizeY - originY * sourceSizeHeight;
    bottom = top + frame.spriteSourceSizeHeight;
  } else {
    left = -originX * sourceSizeWidth;
    right = left + sourceSizeWidth;
    top = -originY * sourceSizeHeight;
    bottom = top + sourceSizeHeight;
  }
  return { left, right, top, bottom };
}
