var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class Color {
  constructor(red = 0, green = 0, blue = 0, alpha = 255) {
    __publicField(this, "rgba");
    this.rgba = new Uint8ClampedArray([red, green, blue, alpha]);
  }
  set(red, green, blue, alpha = this.alpha) {
    this.rgba.set([red, green, blue, alpha]);
    return this;
  }
  setColor(color) {
    const rgba = this.rgba;
    const alpha = color > 16777215 ? color >>> 24 : 255;
    rgba.set([
      color >> 16 & 255,
      color >> 8 & 255,
      color & 255,
      alpha
    ]);
    return this;
  }
  getColor(includeAlpha = false) {
    const [r, g, b, a] = this.rgba;
    if (includeAlpha) {
      return a << 24 | r << 16 | g << 8 | b;
    } else {
      return r << 16 | g << 8 | b;
    }
  }
  get red() {
    return this.rgba[0];
  }
  set red(value) {
    this.rgba[0] = value;
  }
  get green() {
    return this.rgba[1];
  }
  set green(value) {
    this.rgba[1] = value;
  }
  get blue() {
    return this.rgba[2];
  }
  set blue(value) {
    this.rgba[2] = value;
  }
  get alpha() {
    return this.rgba[3];
  }
  set alpha(value) {
    this.rgba[3] = value;
  }
  get r() {
    return this.rgba[0] / 255;
  }
  get g() {
    return this.rgba[1] / 255;
  }
  get b() {
    return this.rgba[2] / 255;
  }
  get a() {
    return this.rgba[3] / 255;
  }
}
