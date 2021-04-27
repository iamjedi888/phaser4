export class Matrix2D {
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
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
    const {a, b, c, d, tx, ty} = this;
    return [a, b, c, d, tx, ty];
  }
  fromArray(src) {
    return this.set(src[0], src[1], src[2], src[3], src[4], src[5]);
  }
}
