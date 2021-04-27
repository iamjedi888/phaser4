import {NOOP} from "../../utils/NOOP";
export class Vec2Callback {
  constructor(onChange, x = 0, y = 0) {
    this._x = x;
    this._y = y;
    this.onChange = onChange;
  }
  destroy() {
    this.onChange = NOOP;
  }
  set(x = 0, y = 0) {
    this._x = x;
    this._y = y;
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
  toArray(dst = [], index = 0) {
    const {x, y} = this;
    dst[index] = x;
    dst[index + 1] = y;
    return dst;
  }
  fromArray(src, index = 0) {
    return this.set(src[index], src[index + 1]);
  }
  toString() {
    const {x, y} = this;
    return `{ x=${x}, y=${y} }`;
  }
}
