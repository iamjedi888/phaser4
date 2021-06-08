var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Emit } from "../../events";
export class Key {
  constructor(value) {
    __publicField(this, "value");
    __publicField(this, "events");
    __publicField(this, "capture", true);
    __publicField(this, "isDown", false);
    __publicField(this, "enabled", true);
    __publicField(this, "repeatRate", 0);
    __publicField(this, "canRepeat", true);
    __publicField(this, "timeDown", 0);
    __publicField(this, "timeUpdated", 0);
    __publicField(this, "timeUp", 0);
    __publicField(this, "shiftKey");
    __publicField(this, "ctrlKey");
    __publicField(this, "altKey");
    __publicField(this, "downCallback");
    __publicField(this, "upCallback");
    this.value = value;
    this.events = new Map();
  }
  getValue() {
    return this.value;
  }
  down(event) {
    if (!this.enabled) {
      return;
    }
    if (this.capture) {
      event.preventDefault();
    }
    this.shiftKey = event.shiftKey;
    this.ctrlKey = event.ctrlKey;
    this.altKey = event.altKey;
    if (this.isDown && this.canRepeat) {
      this.timeUpdated = event.timeStamp;
      const delay = this.timeUpdated - this.timeDown;
      if (delay >= this.repeatRate) {
        Emit(this, "keydown", this);
        if (this.downCallback) {
          this.downCallback(this);
        }
      }
    } else {
      this.isDown = true;
      this.timeDown = event.timeStamp;
      this.timeUpdated = event.timeStamp;
      Emit(this, "keydown", this);
      if (this.downCallback) {
        this.downCallback(this);
      }
    }
  }
  up(event) {
    if (!this.enabled) {
      return;
    }
    if (this.capture) {
      event.preventDefault();
    }
    this.shiftKey = event.shiftKey;
    this.ctrlKey = event.ctrlKey;
    this.altKey = event.altKey;
    if (this.isDown) {
      this.isDown = false;
      this.timeUp = event.timeStamp;
      this.timeUpdated = event.timeStamp;
      Emit(this, "keyup", this);
      if (this.upCallback) {
        this.upCallback(this);
      }
    }
  }
  reset() {
    this.isDown = false;
    this.timeUpdated = this.timeDown;
    this.timeUp = this.timeDown;
  }
  destroy() {
    this.downCallback = null;
    this.upCallback = null;
    this.events.clear();
  }
}
