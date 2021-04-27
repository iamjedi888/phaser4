import {Matrix4} from "./Matrix4";
export function Mat4FromRotationTranslationScaleOrigin(q, v, s, o, out = new Matrix4()) {
  const {x, y, z, w} = q;
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;
  const {x: sx, y: sy, z: sz} = s;
  const {x: ox, y: oy, z: oz} = o;
  const {x: vx, y: vy, z: vz} = v;
  const out0 = (1 - (yy + zz)) * sx;
  const out1 = (xy + wz) * sx;
  const out2 = (xz - wy) * sx;
  const out4 = (xy - wz) * sy;
  const out5 = (1 - (xx + zz)) * sy;
  const out6 = (yz + wx) * sy;
  const out8 = (xz + wy) * sz;
  const out9 = (yz - wx) * sz;
  const out10 = (1 - (xx + yy)) * sz;
  return out.set(out0, out1, out2, 0, out4, out5, out6, 0, out8, out9, out10, 0, vx + ox - (out0 * ox + out4 * oy + out8 * oz), vy + oy - (out1 * ox + out5 * oy + out9 * oz), vz + oz - (out2 * ox + out6 * oy + out10 * oz), 1);
}
