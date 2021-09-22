var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Key } from "../Key";
export class ArrowKeys {
  constructor(keyboardManager, config) {
    __publicField(this, "left");
    __publicField(this, "right");
    __publicField(this, "up");
    __publicField(this, "down");
    __publicField(this, "space");
    const {
      left = true,
      right = true,
      up = true,
      down = true,
      space = true
    } = config;
    const keys = keyboardManager.keys;
    if (left) {
      this.left = new Key("ArrowLeft");
      keys.set(this.left.value, this.left);
    }
    if (right) {
      this.right = new Key("ArrowRight");
      keys.set(this.right.value, this.right);
    }
    if (up) {
      this.up = new Key("ArrowUp");
      keys.set(this.up.value, this.up);
    }
    if (down) {
      this.down = new Key("ArrowDown");
      keys.set(this.down.value, this.down);
    }
    if (space) {
      this.space = new Key(" ");
      keys.set(this.space.value, this.space);
    }
  }
}
