import {CreateAnimData} from "./CreateAnimData";
export function Play(animation, config = {}, ...sprites) {
  const data = CreateAnimData(animation.key, animation.frameRate, animation.duration, animation.delay, animation.repeat, animation.repeatDelay, animation.yoyo, animation.hold, animation.showOnStart, animation.hideOnComplete);
  Object.assign(data, config);
  data.nextFrameTime = animation.msPerFrame + data.delay;
  sprites.forEach((sprite) => {
    if (!sprite || !sprite.animData) {
      return;
    }
    const spriteAnimData = sprite.animData;
    if (spriteAnimData.isPlaying) {
      if (sprite.currentAnimation !== animation) {
        spriteAnimData.isPlaying = false;
        if (spriteAnimData.onComplete) {
          spriteAnimData.onComplete(sprite, sprite.currentAnimation);
        }
      } else if (!data.forceRestart) {
        return;
      }
    }
    Object.assign(spriteAnimData, data);
    sprite.currentAnimation = animation;
    sprite.currentFrame = animation.firstFrame;
    sprite.play();
  });
  return sprites;
}
