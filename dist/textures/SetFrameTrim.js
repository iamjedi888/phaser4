export function SetFrameTrim(frame, width, height, x, y, w, h) {
  frame.trimmed = true;
  frame.sourceSizeWidth = width;
  frame.sourceSizeHeight = height;
  frame.spriteSourceSizeX = x;
  frame.spriteSourceSizeY = y;
  frame.spriteSourceSizeWidth = w;
  frame.spriteSourceSizeHeight = h;
  return frame;
}
