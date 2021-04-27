import {Linear} from "../../math/easing/Linear";
import {TweenProperty} from "./TweenProperty";
export class Tween {
  constructor(target, autoStart = true) {
    this.progress = 0;
    this.isDead = false;
    this._delay = 0;
    this.duration = 0;
    this.elapsed = 0;
    this._delayElapsed = 0;
    this._durationElapsed = 0;
    this.properties = [];
    this.target = target;
    this.autoStart = autoStart;
    this.ease = Linear;
    this.isRunning = false;
  }
  to(duration, toState = null, overwrite = true) {
    return this.add(duration, toState, overwrite);
  }
  from(duration, fromState = null, overwrite = true) {
    return this.add(duration, fromState, overwrite, true);
  }
  add(duration, state, overwrite, reversed = false) {
    const properties = this.properties;
    for (const name in state) {
      const value = state[name];
      properties.push(new TweenProperty(name, value));
    }
    this.duration = duration * 1e3;
    this.reversed = reversed;
    this.overwrite = overwrite;
    if (this.autoStart) {
      this.start();
    }
    return this;
  }
  start() {
    if (this.isRunning) {
      return;
    }
    const properties = this.properties;
    const target = this.target;
    properties.forEach((property) => {
    });
    this._delayElapsed = this._delay;
    this._durationElapsed = this.duration;
    this.elapsed = 0;
    this.isRunning = true;
    this.update(0);
  }
  update(delta) {
    if (!this.isRunning) {
      return false;
    }
    if (this._delayElapsed > 0) {
      this._delayElapsed -= delta;
      if (this._delayElapsed <= 0) {
        this.elapsed = Math.abs(this._delayElapsed);
        this._delayElapsed = 0;
      }
    } else {
      this.elapsed += delta;
      this.progress = Math.min(this.elapsed / this.duration, 1);
      const v = this.ease(this.progress);
      const properties = this.properties;
      properties.forEach((property) => {
        property.update(this.target, v);
      });
      if (this.progress === 1) {
        if (this._yoyo) {
          properties.forEach((property) => {
          });
          this.elapsed = 0;
          this._yoyo = false;
          this.reversed = true;
        } else {
          this.dispose();
          return true;
        }
      }
    }
    return false;
  }
  delay(duration) {
    this._delay = duration * 1e3;
    return this;
  }
  yoyo(value = true) {
    this._yoyo = value;
    return this;
  }
  easing(f) {
    this.ease = f;
    return this;
  }
  dispose() {
    this.isDead = true;
    this.target = null;
    this.properties = null;
    this.ease = null;
    this.isRunning = false;
  }
}
