import {NOOP} from "../../utils/NOOP";
export class Vec3Callback {
  constructor(onChange, x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this.onChange = onChange;
  }
  destroy() {
    this.onChange = NOOP;
  }
  set(x = 0, y = 0, z = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    if (this.onChange) {
      this.onChange(this);
    }
    return this;
  }
  get x() {
    return this._x;
  }
  set x(value) {
    const prev = this._x;
    this._x = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  get y() {
    return this._y;
  }
  set y(value) {
    const prev = this._y;
    this._y = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  get z() {
    return this._z;
  }
  set z(value) {
    const prev = this._z;
    this._z = value;
    if (prev !== value) {
      this.onChange(this);
    }
  }
  toArray(dst = [], index = 0) {
    const {x, y, z} = this;
    dst[index] = x;
    dst[index + 1] = y;
    dst[index + 2] = z;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1], src[index + 2]);
  }
  toString() {
    const {x, y, z} = this;
    return `{ x=${x}, y=${y}, z=${z} }`;
  }
}
