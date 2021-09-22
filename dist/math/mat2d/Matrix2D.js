var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class Matrix2D {
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    __publicField(this, "a");
    __publicField(this, "b");
    __publicField(this, "c");
    __publicField(this, "d");
    __publicField(this, "tx");
    __publicField(this, "ty");
    this.set(a, b, c, d, tx, ty);
  }
  set(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
    return this;
  }
  identity() {
    return this.set();
  }
  toArray() {
    const { a, b, c, d, tx, ty } = this;
    return [a, b, c, d, tx, ty];
  }
  fromArray(src) {
    return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
  }
}
