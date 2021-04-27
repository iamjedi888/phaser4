/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2020 Photon Storm Ltd.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */
import {TriangleContains} from "./TriangleContains";
export class Triangle {
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0) {
    this.set(x1, y1, x2, y2, x3, y3);
  }
  set(x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    return this;
  }
  contains(x, y) {
    return TriangleContains(this, x, y);
  }
  get left() {
    return Math.min(this.x1, this.x2, this.x3);
  }
  set left(value) {
    let diff = 0;
    if (this.x1 <= this.x2 && this.x1 <= this.x3) {
      diff = this.x1 - value;
    } else if (this.x2 <= this.x1 && this.x2 <= this.x3) {
      diff = this.x2 - value;
    } else {
      diff = this.x3 - value;
    }
    this.x1 -= diff;
    this.x2 -= diff;
    this.x3 -= diff;
  }
  get right() {
    return Math.max(this.x1, this.x2, this.x3);
  }
  set right(value) {
    let diff = 0;
    if (this.x1 >= this.x2 && this.x1 >= this.x3) {
      diff = this.x1 - value;
    } else if (this.x2 >= this.x1 && this.x2 >= this.x3) {
      diff = this.x2 - value;
    } else {
      diff = this.x3 - value;
    }
    this.x1 -= diff;
    this.x2 -= diff;
    this.x3 -= diff;
  }
  get top() {
    return Math.min(this.y1, this.y2, this.y3);
  }
  set top(value) {
    let diff = 0;
    if (this.y1 <= this.y2 && this.y1 <= this.y3) {
      diff = this.y1 - value;
    } else if (this.y2 <= this.y1 && this.y2 <= this.y3) {
      diff = this.y2 - value;
    } else {
      diff = this.y3 - value;
    }
    this.y1 -= diff;
    this.y2 -= diff;
    this.y3 -= diff;
  }
  get bottom() {
    return Math.max(this.y1, this.y2, this.y3);
  }
  set bottom(value) {
    let diff = 0;
    if (this.y1 >= this.y2 && this.y1 >= this.y3) {
      diff = this.y1 - value;
    } else if (this.y2 >= this.y1 && this.y2 >= this.y3) {
      diff = this.y2 - value;
    } else {
      diff = this.y3 - value;
    }
    this.y1 -= diff;
    this.y2 -= diff;
    this.y3 -= diff;
  }
}
