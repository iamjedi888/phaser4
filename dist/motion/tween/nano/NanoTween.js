var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Off, On } from "../../../events";
import { GameInstance } from "../../../GameInstance";
import { Linear } from "../../../math/easing/Linear";
import { TweenProperty } from "../TweenProperty";
import { UpdateEvent } from "../../../gameobjects/events";
export class NanoTween {
  constructor(target, emitter, autoStart = true) {
    __publicField(this, "target");
    __publicField(this, "state", { running: false, repeat: false, hold: false, delay: false, yoyo: false, yoyoing: false, autoStart: true, reversed: false });
    __publicField(this, "init", { duration: 0, repeat: 0, repeatDelay: 0, hold: 0, delay: 0 });
    __publicField(this, "counters", { repeat: 0, delay: 0, progress: 0, elapsed: 0 });
    __publicField(this, "ease", Linear);
    __publicField(this, "listener");
    __publicField(this, "emitter");
    __publicField(this, "properties", []);
    if (!emitter) {
      emitter = GameInstance.get();
    }
    this.target = target;
    this.state.autoStart = autoStart;
    this.emitter = emitter;
  }
  to(duration, properties = null) {
    return this.add(duration, properties, false);
  }
  from(duration, properties = null) {
    return this.add(duration, properties, true);
  }
  add(duration, props, reversed) {
    const state = this.state;
    const init = this.init;
    if (state.running) {
      return this;
    }
    const properties = this.properties;
    for (const [name, value] of Object.entries(props)) {
      properties.push(new TweenProperty(name, value));
    }
    init.duration = duration;
    state.reversed = reversed;
    if (state.autoStart) {
      this.start();
    }
    return this;
  }
  start() {
    const state = this.state;
    if (state.running) {
      return this;
    }
    const target = this.target;
    const properties = this.properties;
    properties.forEach((property) => {
      if (state.reversed) {
        property.from(target);
      } else {
        property.to(target);
      }
    });
    state.running = true;
    this.listener = On(this.emitter, UpdateEvent, (delta) => this.update(delta));
    return this;
  }
  restart() {
    const state = this.state;
    const init = this.init;
    const counters = this.counters;
    if (!state) {
      throw "Cannot restart destroyed tween";
    }
    counters.delay = init.delay;
    counters.elapsed = 0;
    counters.progress = 0;
    counters.repeat = init.repeat;
    state.yoyoing = false;
    state.running = true;
    return this;
  }
  update(delta) {
    const state = this.state;
    const init = this.init;
    const counters = this.counters;
    if (!state.running) {
      return false;
    }
    if (counters.delay > 0) {
      counters.delay -= delta;
      if (counters.delay <= 0) {
        counters.elapsed = Math.abs(counters.delay) - delta;
        counters.delay = 0;
      } else {
        return false;
      }
    }
    counters.elapsed += delta;
    const progress = Math.min(counters.elapsed / init.duration, 1);
    counters.progress = progress;
    const v = state.yoyoing ? this.ease(1 - progress) : this.ease(progress);
    const target = this.target;
    const properties = this.properties;
    properties.forEach((property) => {
      property.update(target, v);
    });
    if (progress < 1) {
      return false;
    }
    const diff = counters.elapsed - init.duration;
    if (state.yoyo && !state.yoyoing) {
      counters.elapsed = diff;
      counters.delay = init.hold - diff;
      state.yoyoing = true;
      return false;
    }
    if (counters.repeat > 0) {
      counters.repeat--;
      counters.elapsed = diff;
      counters.delay = init.repeatDelay - diff;
      state.yoyoing = false;
      return false;
    }
    this.destroy();
    return true;
  }
  delay(duration) {
    const delay = duration;
    this.init.delay = delay;
    this.counters.delay = delay;
    return this;
  }
  hold(duration) {
    this.init.hold = duration;
    return this;
  }
  yoyo(value = true) {
    this.state.yoyo = value;
    return this;
  }
  repeat(repeatCount = 1, delay = 0) {
    const init = this.init;
    if (repeatCount === -1) {
      repeatCount = Number.MAX_SAFE_INTEGER;
    }
    this.state.repeat = repeatCount > 0;
    this.counters.repeat = repeatCount;
    init.repeat = repeatCount;
    init.repeatDelay = delay;
    return this;
  }
  easing(f) {
    this.ease = f;
    return this;
  }
  destroy() {
    Off(this.emitter, UpdateEvent, this.listener);
    this.properties.length = 0;
    this.target = null;
    this.ease = null;
    this.emitter = null;
    this.state = null;
    this.init = null;
    this.counters = null;
  }
}
