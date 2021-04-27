import {Vec4Callback} from "./Vec4Callback";
export class RGBACallback extends Vec4Callback {
  constructor(onChange, r = 0, g = 0, b = 0, a = 1) {
    super(onChange, r, g, b, a);
  }
  set r(value) {
    this.x = value;
  }
  get r() {
    return this.x;
  }
  set g(value) {
    this.y = value;
  }
  get g() {
    return this.y;
  }
  set b(value) {
    this.z = value;
  }
  get b() {
    return this.z;
  }
  set a(value) {
    this.w = value;
  }
  get a() {
    return this.w;
  }
  toString() {
    const {x, y, z, w} = this;
    return `[ r=${x}, g=${y}, b=${z}, a=${w} ]`;
  }
}
