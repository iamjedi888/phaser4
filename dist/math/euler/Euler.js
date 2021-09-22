var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Vec3Callback } from "../vec3/Vec3Callback";
export class Euler extends Vec3Callback {
  constructor(onChange, x = 0, y = 0, z = 0, order = "YXZ") {
    super(onChange, x, y, z);
    __publicField(this, "order");
    this.order = order;
  }
  reorder(order) {
    this.order = order;
    this.onChange(this);
    return this;
  }
}
