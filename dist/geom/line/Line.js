var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
export class Line {
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    __publicField(this, "x1");
    __publicField(this, "y1");
    __publicField(this, "x2");
    __publicField(this, "y2");
    this.set(x1, y1, x2, y2);
  }
  set(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    return this;
  }
  get left() {
    return Math.min(this.x1, this.x2);
  }
  set left(value) {
    if (this.x1 <= this.x2) {
      this.x1 = value;
    } else {
      this.x2 = value;
    }
  }
  get right() {
    return Math.max(this.x1, this.x2);
  }
  set right(value) {
    if (this.x1 > this.x2) {
      this.x1 = value;
    } else {
      this.x2 = value;
    }
  }
  get top() {
    return Math.min(this.y1, this.y2);
  }
  set top(value) {
    if (this.y1 <= this.y2) {
      this.y1 = value;
    } else {
      this.y2 = value;
    }
  }
  get bottom() {
    return Math.max(this.y1, this.y2);
  }
  set bottom(value) {
    if (this.y1 > this.y2) {
      this.y1 = value;
    } else {
      this.y2 = value;
    }
  }
}
