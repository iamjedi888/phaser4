var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { TRANSFORM, Transform2DComponent } from "../components/transform/Transform2DComponent";
import { addEntity, removeComponent, removeEntity } from "bitecs";
import { AddTransform2DComponent } from "../components/transform/AddTransform2DComponent";
import { GameObjectWorld } from "../GameObjectWorld";
import { Matrix4 } from "../math/mat4/Matrix4";
import { SetBounds } from "../components/transform/SetBounds";
import { Size } from "../components/transform/Size";
export class BaseCamera {
  constructor(width, height) {
    __publicField(this, "id", addEntity(GameObjectWorld));
    __publicField(this, "type", "BaseCamera");
    __publicField(this, "name", "");
    __publicField(this, "size");
    __publicField(this, "matrix");
    __publicField(this, "isDirty");
    __publicField(this, "_data");
    const id = this.id;
    AddTransform2DComponent(id);
    this.matrix = new Matrix4();
    this.size = new Size(id, width, height);
    this._data = Transform2DComponent.data[id];
    this.reset(width, height);
  }
  preRender() {
    return this.isDirty;
  }
  postRender() {
    this.isDirty = false;
  }
  getBoundsX() {
    return this._data[TRANSFORM.BOUNDS_X1];
  }
  getBoundsY() {
    return this._data[TRANSFORM.BOUNDS_Y1];
  }
  getBoundsRight() {
    return this._data[TRANSFORM.BOUNDS_X2];
  }
  getBoundsBottom() {
    return this._data[TRANSFORM.BOUNDS_Y2];
  }
  getMatrix() {
    return this.matrix.data;
  }
  reset(width, height) {
    this.size.set(width, height);
    this.isDirty = true;
    SetBounds(this.id, 0, 0, width, height);
  }
  destroy() {
    const id = this.id;
    removeComponent(GameObjectWorld, Transform2DComponent, id);
    removeEntity(GameObjectWorld, id);
  }
}
