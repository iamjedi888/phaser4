var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { TRANSFORM, Transform2DComponent } from "../../components/transform/Transform2DComponent";
import { AddTransform2DComponent } from "../../components/transform/AddTransform2DComponent";
import { Color } from "../../components/color/Color";
import { Flush } from "../../renderer/webgl1/renderpass/Flush";
import { GameObject } from "../GameObject";
import { GetDefaultOriginX } from "../../config/defaultorigin/GetDefaultOriginX";
import { GetDefaultOriginY } from "../../config/defaultorigin/GetDefaultOriginY";
import { Origin } from "../../components/transform/Origin";
import { PopColor } from "../../renderer/webgl1/renderpass/PopColor";
import { PopShader } from "../../renderer/webgl1/renderpass/PopShader";
import { Position } from "../../components/transform/Position";
import { Rectangle } from "../../geom/rectangle/Rectangle";
import { Scale } from "../../components/transform/Scale";
import { SetColor } from "../../renderer/webgl1/renderpass/SetColor";
import { SetDirtyTransform } from "../../components/dirty/SetDirtyTransform";
import { SetShader } from "../../renderer/webgl1/renderpass/SetShader";
import { Size } from "../../components/transform/Size";
import { Skew } from "../../components/transform/Skew";
import { UpdateAxisAligned } from "../../components/transform/UpdateAxisAligned";
export class Container extends GameObject {
  constructor(x = 0, y = 0) {
    super();
    __publicField(this, "type", "Container");
    __publicField(this, "position");
    __publicField(this, "scale");
    __publicField(this, "skew");
    __publicField(this, "origin");
    __publicField(this, "size");
    __publicField(this, "color");
    __publicField(this, "shader");
    __publicField(this, "_rotation", 0);
    const id = this.id;
    AddTransform2DComponent(id);
    this.position = new Position(id, x, y);
    this.scale = new Scale(id);
    this.skew = new Skew(id);
    this.size = new Size(id);
    this.origin = new Origin(id, GetDefaultOriginX(), GetDefaultOriginY());
    this.color = new Color(id);
  }
  renderGL(renderPass) {
    if (this.shader) {
      Flush(renderPass);
      SetShader(this.shader, 0);
    }
    SetColor(renderPass, this.color);
    this.preRenderGL(renderPass);
  }
  postRenderGL(renderPass) {
    if (this.shader) {
      Flush(renderPass);
      PopShader();
    }
    PopColor(renderPass, this.color);
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
  set rotation(value) {
    this._rotation = value;
    const id = this.id;
    Transform2DComponent.data[id][TRANSFORM.ROTATION] = value;
    UpdateAxisAligned(id);
    SetDirtyTransform(id);
  }
  get rotation() {
    return this._rotation;
  }
  get alpha() {
    return this.color.alpha;
  }
  set alpha(value) {
    this.color.alpha = value;
  }
  setAlpha(value) {
    this.alpha = value;
    return this;
  }
  setPosition(x, y) {
    this.position.set(x, y);
    return this;
  }
  setScale(x, y) {
    this.scale.set(x, y);
    return this;
  }
  setRotation(value) {
    this.rotation = value;
    return this;
  }
  setSkew(x, y) {
    this.skew.set(x, y);
    return this;
  }
  setOrigin(x, y) {
    this.origin.set(x, y);
    return this;
  }
  getBounds() {
    const data = Transform2DComponent.data[this.id];
    const x = data[TRANSFORM.BOUNDS_X1];
    const y = data[TRANSFORM.BOUNDS_Y1];
    const right = data[TRANSFORM.BOUNDS_X2];
    const bottom = data[TRANSFORM.BOUNDS_Y2];
    return new Rectangle(x, y, right - x, bottom - y);
  }
  destroy(reparentChildren) {
    this.position.destroy();
    this.scale.destroy();
    this.skew.destroy();
    this.origin.destroy();
    super.destroy(reparentChildren);
  }
}
