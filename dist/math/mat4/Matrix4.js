var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { NOOP } from "../../utils/NOOP";
export class Matrix4 {
  constructor(src) {
    __publicField(this, "data");
    __publicField(this, "onChange");
    const data = new Float32Array(16);
    this.data = data;
    this.onChange = NOOP;
    if (src) {
      if (Array.isArray(src)) {
        this.fromArray(src);
      } else {
        this.fromArray(src.data);
      }
    } else {
      data[0] = 1;
      data[5] = 1;
      data[10] = 1;
      data[15] = 1;
    }
  }
  set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    this.data.set([
      m00,
      m01,
      m02,
      m03,
      m10,
      m11,
      m12,
      m13,
      m20,
      m21,
      m22,
      m23,
      m30,
      m31,
      m32,
      m33
    ]);
    this.onChange(this);
    return this;
  }
  toArray(dst = [], index = 0) {
    const data = this.data;
    for (let i = 0; i < 16; i++) {
      dst[index + i] = data[i];
    }
    return dst;
  }
  fromArray(src, index = 0) {
    const data = this.data;
    for (let i = 0; i < 16; i++) {
      data[i] = src[index + i];
    }
    this.onChange(this);
    return this;
  }
  toString() {
    return "[ mat4=" + this.data.join(", ") + " ]";
  }
  destroy() {
    this.onChange = NOOP;
    this.data = null;
  }
}
