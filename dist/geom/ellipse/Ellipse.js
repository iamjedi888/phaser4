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
import { EllipseContains } from "./EllipseContains";
export class Ellipse {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "width");
    __publicField(this, "height");
    this.set(x, y, width, height);
  }
  set(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }
  contains(x, y) {
    return EllipseContains(this, x, y);
  }
  getMinorRadius() {
    return Math.min(this.width, this.height) / 2;
  }
  getMajorRadius() {
    return Math.max(this.width, this.height) / 2;
  }
  get left() {
    return this.x - this.width / 2;
  }
  set left(value) {
    this.x = value + this.width / 2;
  }
  get right() {
    return this.x + this.width / 2;
  }
  set right(value) {
    this.x = value - this.width / 2;
  }
  get top() {
    return this.y - this.height / 2;
  }
  set top(value) {
    this.y = value + this.height / 2;
  }
  get bottom() {
    return this.y + this.height / 2;
  }
  set bottom(value) {
    this.y = value - this.height / 2;
  }
}
