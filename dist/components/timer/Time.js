var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GameInstance } from "../../GameInstance";
import { RenderStats } from "../../scenes/RenderStats";
export class Time {
  constructor() {
    __publicField(this, "lastTick", 0);
    __publicField(this, "elapsed", 0);
    __publicField(this, "delta", 0);
    __publicField(this, "fps", 60);
    __publicField(this, "fpsCount", 0);
    __publicField(this, "frame", 0);
    __publicField(this, "ms", 0);
    __publicField(this, "prevFrame", 0);
    const now = performance.now();
    this.lastTick = now;
    this.prevFrame = now;
  }
  update(time) {
    this.ms = time - this.lastTick;
  }
  updateDelta(time) {
    const now = performance.now();
    const elapsed = now - time;
    this.fpsCount++;
    if (now >= this.prevFrame + 1e3) {
      this.fps = this.fpsCount * 1e3 / (now - this.prevFrame);
      this.prevFrame = now;
      this.fpsCount = 0;
    }
    this.lastTick = now;
    this.elapsed += elapsed;
    this.delta = 1e3 / this.fps;
    this.frame++;
    GameInstance.setFrame(this.frame);
    RenderStats.fps = this.fps;
    RenderStats.delta = 1e3 / this.fps;
    return this.frame;
  }
  resetLastTick() {
    this.lastTick = performance.now();
  }
}
