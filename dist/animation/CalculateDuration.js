export function CalculateDuration(animation, frameRate, duration) {
  const totalFrames = animation.frames.size;
  if (!Number.isFinite(duration) && !Number.isFinite(frameRate)) {
    animation.frameRate = 24;
    animation.duration = 24 / totalFrames * 1e3;
  } else if (duration && !Number.isFinite(frameRate)) {
    animation.duration = duration;
    animation.frameRate = totalFrames / (duration / 1e3);
  } else {
    animation.frameRate = frameRate;
    animation.duration = totalFrames / frameRate * 1e3;
  }
  animation.msPerFrame = 1e3 / animation.frameRate;
  return animation;
}
