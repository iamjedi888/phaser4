import {DIRTY_CONST} from "../DIRTY_CONST";
import {GameObject} from "../GameObject";
import {GetRectangleSize} from "../../geom/rectangle/GetRectangleSize";
import {Vec2} from "../../math/vec2/Vec2";
export class Container extends GameObject {
  constructor(x = 0, y = 0) {
    super(x, y);
    this._alpha = 1;
    this.type = "Container";
  }
  setSize(width, height = width) {
    this.transform.updateExtent(width, height);
    return this;
  }
  getSize(out = new Vec2()) {
    return GetRectangleSize(this.transform.extent, out);
  }
  setPosition(x, y) {
    this.transform.position.set(x, y);
    return this;
  }
  getPosition(out = new Vec2()) {
    const position = this.transform.position;
    return out.set(position.x, position.y);
  }
  setOrigin(x, y = x) {
    this.transform.origin.set(x, y);
    return this;
  }
  getOrigin(out = new Vec2()) {
    const origin = this.transform.origin;
    return out.set(origin.x, origin.y);
  }
  setSkew(x, y = x) {
    this.transform.skew.set(x, y);
    return this;
  }
  getSkew(out = new Vec2()) {
    const skew = this.transform.skew;
    return out.set(skew.x, skew.y);
  }
  setScale(x, y = x) {
    this.transform.scale.set(x, y);
    return this;
  }
  getScale(out = new Vec2()) {
    const scale = this.transform.scale;
    return out.set(scale.x, scale.y);
  }
  setRotation(value) {
    this.transform.rotation = value;
    return this;
  }
  getRotation() {
    return this.transform.rotation;
  }
  set width(value) {
    this.transform.updateExtent(value);
  }
  get width() {
    return this.transform.extent.width;
  }
  set height(value) {
    this.transform.updateExtent(void 0, value);
  }
  get height() {
    return this.transform.extent.height;
  }
  set x(value) {
    this.transform.position.x = value;
  }
  get x() {
    return this.transform.position.x;
  }
  set y(value) {
    this.transform.position.y = value;
  }
  get y() {
    return this.transform.position.y;
  }
  set originX(value) {
    this.transform.origin.x = value;
  }
  get originX() {
    return this.transform.origin.x;
  }
  set originY(value) {
    this.transform.origin.y = value;
  }
  get originY() {
    return this.transform.origin.y;
  }
  set skewX(value) {
    this.transform.skew.x = value;
  }
  get skewX() {
    return this.transform.skew.x;
  }
  set skewY(value) {
    this.transform.skew.y = value;
  }
  get skewY() {
    return this.transform.skew.y;
  }
  set scaleX(value) {
    this.transform.scale.x = value;
  }
  get scaleX() {
    return this.transform.scale.x;
  }
  set scaleY(value) {
    this.transform.scale.y = value;
  }
  get scaleY() {
    return this.transform.scale.y;
  }
  set rotation(value) {
    this.transform.rotation = value;
  }
  get rotation() {
    return this.transform.rotation;
  }
  get alpha() {
    return this._alpha;
  }
  set alpha(value) {
    if (value !== this._alpha) {
      this._alpha = value;
      this.vertices.forEach((vertex) => {
        vertex.setAlpha(value);
      });
      this.setDirty(DIRTY_CONST.COLORS);
    }
  }
}
