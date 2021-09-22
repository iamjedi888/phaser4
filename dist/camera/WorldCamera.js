var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BaseCamera } from "./BaseCamera";
import { ClearDirtyTransform } from "../components/dirty/ClearDirtyTransform";
import { HasDirtyTransform } from "../components/dirty/HasDirtyTransform";
import { Position } from "../components/transform/Position";
import { SetBounds } from "../components/transform/SetBounds";
export class WorldCamera extends BaseCamera {
  constructor(width, height) {
    super(width, height);
    __publicField(this, "type", "WorldCamera");
    __publicField(this, "position");
    this.position = new Position(this.id, 0, 0);
  }
  set x(value) {
    this.position.x = value;
  }
  get x() {
    return this.position.x;
  }
  set y(value) {
    this.position.y = value;
  }
  get y() {
    return this.position.y;
  }
  setPosition(x, y) {
    this.position.set(x, y);
    return this;
  }
  preRender() {
    const id = this.id;
    if (HasDirtyTransform(id)) {
      const x = this.x;
      const y = this.y;
      const w = this.size.width;
      const h = this.size.height;
      const ox = -x + w / 2;
      const oy = -y + h / 2;
      const bx = ox - w / 2;
      const by = oy - h / 2;
      SetBounds(id, bx, by, bx + w, by + h);
      const data = this.matrix.data;
      data[12] = this.x;
      data[13] = this.y;
      ClearDirtyTransform(id);
      this.isDirty = true;
      return true;
    }
    return false;
  }
}
