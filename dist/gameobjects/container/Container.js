import {DIRTY_CONST} from "../DIRTY_CONST";
import {GameObject} from "../GameObject";
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
  setPosition(x, y) {
    this.transform.position.set(x, y);
    return this;
  }
  setOrigin(x, y = x) {
    this.transform.origin.set(x, y);
    return this;
  }
  setSkew(x, y = x) {
    this.transform.skew.set(x, y);
    return this;
  }
  setScale(x, y = x) {
    this.transform.scale.set(x, y);
    return this;
  }
  setRotation(value) {
    this.transform.rotation = value;
    return this;
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
      this.setDirty(DIRTY_CONST.TRANSFORM);
    }
  }
}
