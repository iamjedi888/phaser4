var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { PackColor } from "../renderer/webgl1/colors/PackColor";
export class Vertex {
  constructor(x = 0, y = 0, z = 0) {
    __publicField(this, "x", 0);
    __publicField(this, "y", 0);
    __publicField(this, "z", 0);
    __publicField(this, "u", 0);
    __publicField(this, "v", 0);
    __publicField(this, "texture", 0);
    __publicField(this, "tint", 16777215);
    __publicField(this, "alpha", 1);
    __publicField(this, "color", 4294967295);
    this.x = x;
    this.y = y;
    this.z = z;
  }
  setPosition(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  setUV(u, v) {
    this.u = u;
    this.v = v;
    return this;
  }
  setColor(color, alpha = 1) {
    this.tint = color;
    this.alpha = alpha;
    this.packColor();
    return this;
  }
  setAlpha(value) {
    this.alpha = value;
    return this;
  }
  setTint(value) {
    this.tint = value;
    return this;
  }
  packColor() {
    this.color = PackColor(this.tint, this.alpha);
  }
}
