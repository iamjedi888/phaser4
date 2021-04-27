import {Vec4} from "./Vec4";
export function Vec4Random(a, scale = 1, out = new Vec4()) {
  let v1;
  let v2;
  let v3;
  let v4;
  let s1;
  let s2;
  do {
    v1 = Math.random() * 2 - 1;
    v2 = Math.random() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = Math.random() * 2 - 1;
    v4 = Math.random() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);
  const d = Math.sqrt((1 - s1) / s2);
  return out.set(scale * v1, scale * v2, scale * v3 * d, scale * v4 * d);
}
