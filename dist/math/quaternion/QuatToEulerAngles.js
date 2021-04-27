import {Vec3} from "../vec3";
export function QuatToEulerAngles(q, out = new Vec3()) {
  const {x, y, z, w} = q;
  const sqw = w * w;
  const sqz = z * z;
  const sqx = x * x;
  const sqy = y * y;
  const zAxisY = y * z - x * w;
  const limit = 0.4999999;
  if (zAxisY < -limit) {
    return out.set(Math.PI / 2, 2 * Math.atan2(y, w), 0);
  } else if (zAxisY > limit) {
    return out.set(-Math.PI / 2, 2 * Math.atan2(y, w), 0);
  } else {
    return out.set(Math.asin(-2 * (z * y - x * w)), Math.atan2(2 * (z * x + y * w), sqz - sqx - sqy + sqw), Math.atan2(2 * (x * y + z * w), -sqz - sqx + sqy + sqw));
  }
}
