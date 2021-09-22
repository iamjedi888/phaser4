var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { TRANSFORM, Transform2DComponent } from "./Transform2DComponent";
import { UpdateExtent } from "./UpdateExtent";
export class Origin {
  constructor(id, x = 0, y = 0) {
    __publicField(this, "id");
    __publicField(this, "_x");
    __publicField(this, "_y");
    __publicField(this, "_data");
    this.id = id;
    this._data = Transform2DComponent.data[id];
    this.set(x, y);
  }
  set(x, y = x) {
    const data = this._data;
    this._x = x;
    this._y = y;
    data[TRANSFORM.ORIGIN_X] = x;
    data[TRANSFORM.ORIGIN_Y] = y;
    UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);
    return this;
  }
  set x(value) {
    const data = this._data;
    this._x = value;
    data[TRANSFORM.ORIGIN_X] = value;
    UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);
  }
  get x() {
    return this._x;
  }
  set y(value) {
    const data = this._data;
    this._y = value;
    data[TRANSFORM.ORIGIN_Y] = value;
    UpdateExtent(this.id, data[TRANSFORM.FRAME_WIDTH], data[TRANSFORM.FRAME_HEIGHT]);
  }
  get y() {
    return this._y;
  }
  destroy() {
    this._data = null;
  }
}
