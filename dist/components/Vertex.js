import {PackColor} from "../renderer/webgl1/colors/PackColor";
export class Vertex {
  constructor(x = 0, y = 0, z = 0) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.u = 0;
    this.v = 0;
    this.texture = 0;
    this.tint = 16777215;
    this.alpha = 1;
    this.color = 4294967295;
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
