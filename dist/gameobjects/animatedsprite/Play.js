export function Play(key, config = {}, ...sprites) {
  const {
    speed = 24,
    repeat = 0,
    yoyo = false,
    startFrame = 0,
    delay = 0,
    repeatDelay = 0,
    onStart = null,
    onRepeat = null,
    onComplete = null,
    forceRestart = false
  } = config;
  sprites.forEach((sprite) => {
    const data = sprite.animData;
    if (data.isPlaying) {
      if (data.currentAnim !== key) {
        data.isPlaying = false;
        data.currentAnim = "";
        if (data.onComplete) {
          data.onComplete(sprite, sprite.currentAnimation);
        }
      } else if (!forceRestart) {
        return;
      }
    }
  });
  return sprites;
}
