var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { CalculateDuration } from "./CalculateDuration";
import { LinkFrames } from "./LinkFrames";
export class Animation {
  constructor(config) {
    __publicField(this, "key");
    __publicField(this, "frames");
    __publicField(this, "firstFrame");
    __publicField(this, "msPerFrame");
    __publicField(this, "frameRate");
    __publicField(this, "duration");
    __publicField(this, "skipMissedFrames");
    __publicField(this, "delay");
    __publicField(this, "hold");
    __publicField(this, "repeat");
    __publicField(this, "repeatDelay");
    __publicField(this, "yoyo");
    __publicField(this, "showOnStart");
    __publicField(this, "hideOnComplete");
    __publicField(this, "paused");
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
