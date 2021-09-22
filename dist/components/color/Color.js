var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { AddColorComponent } from "./AddColorComponent";
import { ColorComponent } from "./ColorComponent";
import { SetDirtyColor } from "../dirty";
import { SetWillColorChildren } from "../permissions/SetWillColorChildren";
import { WillColorChildren } from "../permissions/WillColorChildren";
export class Color {
  constructor(id, red = 255, green = 255, blue = 255, alpha = 1) {
    __publicField(this, "id");
    __publicField(this, "colorMatrixEnabled", false);
    AddColorComponent(id);
    this.id = id;
    this.set(red, green, blue, alpha);
  }
  set(red, green, blue, alpha) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
  set tint(value) {
    this.red = value >> 16 & 255;
    this.green = value >> 8 & 255;
    this.blue = value & 255;
  }
  get tint() {
    return this.red << 16 | this.green << 8 | this.blue;
  }
  set willColorChildren(value) {
    SetWillColorChildren(this.id, value);
  }
  get willColorChildren() {
    return WillColorChildren(this.id);
  }
  set colorMatrix(value) {
    ColorComponent.colorMatrix[this.id].set(value);
    SetDirtyColor(this.id);
    this.colorMatrixEnabled = true;
  }
  get colorMatrix() {
    return ColorComponent.colorMatrix[this.id];
  }
  set colorOffset(value) {
    ColorComponent.colorOffset[this.id].set(value);
    SetDirtyColor(this.id);
  }
  get colorOffset() {
    return ColorComponent.colorOffset[this.id];
  }
  set red(value) {
    ColorComponent.r[this.id] = value;
    SetDirtyColor(this.id);
  }
  get red() {
    return ColorComponent.r[this.id];
  }
  set green(value) {
    ColorComponent.g[this.id] = value;
    SetDirtyColor(this.id);
  }
  get green() {
    return ColorComponent.g[this.id];
  }
  set blue(value) {
    ColorComponent.b[this.id] = value;
    SetDirtyColor(this.id);
  }
  get blue() {
    return ColorComponent.b[this.id];
  }
  set alpha(value) {
    ColorComponent.a[this.id] = value;
    SetDirtyColor(this.id);
  }
  get alpha() {
    return ColorComponent.a[this.id];
  }
}
