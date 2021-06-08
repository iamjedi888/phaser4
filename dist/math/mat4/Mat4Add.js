import { Matrix4 } from "./Matrix4";
export function Mat4Add(a, b, out = new Matrix4()) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a.data;
  const [b00, b01, b02, b03, b10, b11, b12, b13, b20, b21, b22, b23, b30, b31, b32, b33] = b.data;
  return out.set(a00 + b00, a01 + b01, a02 + b02, a03 + b03, a10 + b10, a11 + b11, a12 + b12, a13 + b13, a20 + b20, a21 + b21, a22 + b22, a23 + b23, a30 + b30, a31 + b31, a32 + b32, a33 + b33);
}
