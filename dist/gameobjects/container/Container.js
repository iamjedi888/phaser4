var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { AddTransform2DComponent, Extent2DComponent, Transform2DComponent, UpdateExtent } from "../../components/transform/";
import { GetDefaultOriginX, GetDefaultOriginY } from "../../config/defaultorigin";
import { GameObject } from "../GameObject";
import { SetDirtyAlpha } from "../../components/dirty/";
import { Vec2 } from "../../math/vec2/Vec2";
export class Container extends GameObject {
  constructor(x = 0, y = 0) {
    super();
    __publicField(this, "_alpha", 1);
    AddTransform2DComponent(this.id, x, y, GetDefaultOriginX(), GetDefaultOriginY());
  }
  updateWorldTransform() {
  }
  getBounds() {
    return this.bounds.get();
  }
  setSize(width, height = width) {
    UpdateExtent(this.id, width, height);
    return this;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
  setSkew(x, y = x) {
    this.skewX = x;
    this.skewY = y;
    return this;
  }
  setScale(x, y = x) {
    this.scaleX = x;
    this.scaleY = y;
    return this;
  }
  setRotation(value) {
    this.rotation = value;
    return this;
  }
  setOrigin(x, y = x) {
    const id = this.id;
    Transform2DComponent.originX[id] = x;
    Transform2DComponent.originY[id] = y;
    UpdateExtent(id, this.width, this.height);
    return this;
  }
  getSize(out = new Vec2()) {
    return out.set(Extent2DComponent.width[this.id], Extent2DComponent.height[this.id]);
  }
  getPosition(out = new Vec2()) {
    return out.set(this.x, this.y);
  }
  getOrigin(out = new Vec2()) {
    return out.set(this.originX, this.originY);
  }
  getSkew(out = new Vec2()) {
    return out.set(this.skewX, this.skewY);
  }
  getScale(out = new Vec2()) {
    return out.set(this.scaleX, this.scaleY);
  }
  getRotation() {
    return this.rotation;
  }
  set width(value) {
    UpdateExtent(this.id, value, this.height);
  }
  get width() {
    return Extent2DComponent.width[this.id];
  }
  set height(value) {
    UpdateExtent(this.id, this.width, value);
  }
  get height() {
    return Extent2DComponent.height[this.id];
  }
  set x(value) {
    Transform2DComponent.x[this.id] = value;
  }
  get x() {
    return Transform2DComponent.x[this.id];
  }
  set y(value) {
    Transform2DComponent.y[this.id] = value;
  }
  get y() {
    return Transform2DComponent.y[this.id];
  }
  set originX(value) {
    Transform2DComponent.originX[this.id] = value;
    UpdateExtent(this.id, this.width, this.height);
  }
  get originX() {
    return Transform2DComponent.originX[this.id];
  }
  set originY(value) {
    Transform2DComponent.originY[this.id] = value;
    UpdateExtent(this.id, this.width, this.height);
  }
  get originY() {
    return Transform2DComponent.originY[this.id];
  }
  set skewX(value) {
    Transform2DComponent.skewX[this.id] = value;
  }
  get skewX() {
    return Transform2DComponent.skewX[this.id];
  }
  set skewY(value) {
    Transform2DComponent.skewY[this.id] = value;
  }
  get skewY() {
    return Transform2DComponent.skewY[this.id];
  }
  set scaleX(value) {
    Transform2DComponent.scaleX[this.id] = value;
  }
  get scaleX() {
    return Transform2DComponent.scaleX[this.id];
  }
  set scaleY(value) {
    Transform2DComponent.scaleY[this.id] = value;
  }
  get scaleY() {
    return Transform2DComponent.scaleY[this.id];
  }
  set rotation(value) {
    Transform2DComponent.rotation[this.id] = value;
  }
  get rotation() {
    return Transform2DComponent.rotation[this.id];
  }
  get alpha() {
    return this._alpha;
  }
  set alpha(value) {
    this._alpha = value;
    SetDirtyAlpha(this.id);
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
  }
}
