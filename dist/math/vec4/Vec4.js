var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class Vec4 {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "z");
    __publicField(this, "w");
    this.set(x, y, z, w);
  }
  set(x = 0, y = 0, z = 0, w = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  }
  toArray(dst = [], index = 0) {
    const { x, y, z, w } = this;
    dst[index] = x;
    dst[index + 1] = y;
    dst[index + 2] = z;
    dst[index + 3] = w;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1], src[index + 2], src[index + 3]);
  }
  toString() {
    const { x, y, z, w } = this;
    return `{ x=${x}, y=${y}, z=${z}, w=${w} }`;
  }
}
