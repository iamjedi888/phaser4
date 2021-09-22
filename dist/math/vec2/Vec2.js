var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Vec2FromArray } from "./Vec2FromArray";
import { Vec2ToArray } from "./Vec2ToArray";
export class Vec2 {
  constructor(x = 0, y = 0) {
    __publicField(this, "x");
    __publicField(this, "y");
    this.set(x, y);
  }
  set(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    return this;
  }
  toArray(dst = [], index = 0) {
    return Vec2ToArray(this, dst, index);
  }
  fromArray(src, index = 0) {
    Vec2FromArray(this, src, index);
    return this;
  }
  toString() {
    return `{ x=${this.x}, y=${this.y} }`;
  }
}
