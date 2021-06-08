var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { On } from "../../events/On";
import { Tween } from "./Tween";
import { UpdateEvent } from "../../gameobjects/events/UpdateEvent";
export class TweenPlugin {
  constructor(world) {
    __publicField(this, "world");
    __publicField(this, "tweens", new Set());
    __publicField(this, "paused", false);
    __publicField(this, "timeScale", 1);
    this.world = world;
    On(world, UpdateEvent, (delta) => this.update(delta));
  }
  add(target, autoStart = true) {
    const tween = new Tween(target, autoStart);
    this.tweens.add(tween);
    return tween;
  }
  update(delta) {
    if (this.paused) {
      return;
    }
    delta *= this.timeScale;
    const tweens = this.tweens;
    for (const tween of tweens) {
      if (tween.update(delta)) {
        tweens.delete(tween);
      }
    }
  }
  killAllTweens() {
    const tweens = this.tweens;
    tweens.forEach((tween) => {
      tween.dispose();
    });
    tweens.clear();
  }
  killTweensOf(target) {
    const tweens = this.tweens;
    tweens.forEach((tween) => {
      if (tween.target === target) {
        tween.dispose();
        tweens.delete(tween);
      }
    });
  }
  pauseAllTweens() {
    this.paused = true;
  }
  resumeAllTweens() {
    this.paused = false;
  }
  destroy() {
    this.killAllTweens();
  }
}
