export function SpriteSheetParser(texture, x, y, width, height, frameConfig) {
  const {
    frameWidth = null,
    endFrame = -1,
    margin = 0,
    spacingX = 0,
    spacingY = 0
  } = frameConfig;
  let {
    frameHeight = null,
    startFrame = 0
  } = frameConfig;
  if (!frameHeight) {
    frameHeight = frameWidth;
  }
  if (frameWidth === null) {
    throw new Error("SpriteSheetParser: Invalid frameWidth");
  }
  const row = Math.floor((width - margin + spacingX) / (frameWidth + spacingX));
  const column = Math.floor((height - margin + spacingY) / (frameHeight + spacingY));
  let total = row * column;
  if (total === 0) {
    console.warn("SpriteSheetParser: Frame config will result in zero frames");
  }
  if (startFrame > total || startFrame < -total) {
    startFrame = 0;
  }
  if (startFrame < 0) {
    startFrame = total + startFrame;
  }
  if (endFrame !== -1) {
    total = startFrame + (endFrame + 1);
  }
  let fx = margin;
  let fy = margin;
  let ax = 0;
  let ay = 0;
  for (let i = 0; i < total; i++) {
    ax = 0;
    ay = 0;
    const w = fx + frameWidth;
    const h = fy + frameHeight;
    if (w > width) {
      ax = w - width;
    }
    if (h > height) {
      ay = h - height;
    }
    texture.addFrame(i, x + fx, y + fy, frameWidth - ax, frameHeight - ay);
    fx += frameWidth + spacingX;
    if (fx + frameWidth > width) {
      fx = margin;
      fy += frameHeight + spacingY;
    }
  }
}
