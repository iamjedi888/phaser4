var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class Clock {
  constructor(world) {
    __publicField(this, "world");
    __publicField(this, "now");
    __publicField(this, "timeScale");
    __publicField(this, "events");
    this.world = world;
    this.timeScale = 1;
    this.events = new Set();
  }
  update(delta, time) {
    this.now = time;
    delta *= this.timeScale;
    this.events.forEach((timer) => {
      if (timer.update(delta)) {
        this.events.delete(timer);
      }
    });
  }
}
