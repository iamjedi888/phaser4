var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
import { UpdateExtent } from "./UpdateExtent";
export class Size {
  constructor(id, width = 0, height = 0) {
    __publicField(this, "id");
    __publicField(this, "_data");
    this.id = id;
    this._data = Transform2DComponent.data[id];
    this.set(width, height);
  }
  set(width, height = width) {
    this.width = width;
    this.height = height;
    return this;
  }
  set width(value) {
    UpdateExtent(this.id, value, this.height);
  }
  get width() {
    return this._data[TRANSFORM.FRAME_WIDTH];
  }
  set height(value) {
    UpdateExtent(this.id, this.width, value);
  }
  get height() {
    return this._data[TRANSFORM.FRAME_HEIGHT];
  }
  set x(value) {
    this.width = value;
  }
  get x() {
    return this.width;
  }
  set y(value) {
    this.height = value;
  }
  get y() {
    return this.height;
  }
  destroy() {
    this._data = null;
  }
}
