import { SetExtent } from "../components/transform/SetExtent";
export function SetExtentFromFrame(child, frame) {
  const originX = child.origin.x;
  const originY = child.origin.y;
  const sourceSizeWidth = frame.sourceSizeWidth;
  const sourceSizeHeight = frame.sourceSizeHeight;
  let x;
  let y;
  let width;
  let height;
  if (frame.trimmed) {
    x = frame.spriteSourceSizeX - originX * sourceSizeWidth;
    y = frame.spriteSourceSizeY - originY * sourceSizeHeight;
    width = frame.spriteSourceSizeWidth;
    height = frame.spriteSourceSizeHeight;
  } else {
    x = -originX * sourceSizeWidth;
    y = -originY * sourceSizeHeight;
    width = sourceSizeWidth;
    height = sourceSizeHeight;
  }
  SetExtent(child.id, x, y, width, height);
  return child;
}
