var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
    const { x, y } = this;
    dst[index] = x;
    dst[index + 1] = y;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1]);
  }
  toString() {
    const { x, y } = this;
    return `{ x=${x}, y=${y} }`;
  }
}
