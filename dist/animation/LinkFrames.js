export function LinkFrames(animation) {
  const totalFrames = animation.frames.size;
  if (totalFrames === 0) {
    return animation;
  }
  let i = 0;
  const framePercent = 1 / totalFrames;
  let firstFrame;
  let prevFrame;
  for (const frame of animation.frames.values()) {
    if (!prevFrame) {
      frame.isFirst = true;
      animation.firstFrame = frame;
      firstFrame = frame;
    } else {
      prevFrame.nextFrame = frame;
      frame.prevFrame = prevFrame;
    }
    prevFrame = frame;
    i++;
    frame.progress = framePercent * i;
    if (i === totalFrames) {
      frame.isLast = true;
      frame.nextFrame = firstFrame;
      firstFrame.prevFrame = frame;
    }
  }
  return animation;
}
