import {CalculateDuration} from "./CalculateDuration";
import {LinkFrames} from "./LinkFrames";
export class Animation {
  constructor(config) {
    const {
      key,
      frames = [],
      frameRate = null,
      duration = null,
      skipMissedFrames = true,
      delay = 0,
      repeat = 0,
      repeatDelay = 0,
      yoyo = false,
      showOnStart = false,
      hideOnComplete = false,
      paused = false
    } = config;
    this.key = key;
    this.skipMissedFrames = skipMissedFrames;
    this.delay = delay;
    this.repeat = repeat;
    this.repeatDelay = repeatDelay;
    this.yoyo = yoyo;
    this.showOnStart = showOnStart;
    this.hideOnComplete = hideOnComplete;
    this.paused = paused;
    this.frames = new Set(frames);
    CalculateDuration(this, frameRate, duration);
    LinkFrames(this);
  }
  getTotalFrames() {
    return this.frames.size;
  }
  destroy() {
    this.frames.clear();
  }
}
