import {GetDefaultOriginX, GetDefaultOriginY} from "../config/defaultorigin";
import {UpdateLocalTransform, UpdateWorldTransform} from "../components/transform";
import {BoundsComponent} from "../components/bounds/BoundsComponent";
import {DIRTY_CONST} from "./DIRTY_CONST";
import {DestroyChildren} from "../display/DestroyChildren";
import {DestroyEvent} from "./events/DestroyEvent";
import {Emit} from "../events/Emit";
import {GameInstance} from "../GameInstance";
import {GetRectangleSize} from "../geom/rectangle/GetRectangleSize";
import {InputComponent} from "../components/input/InputComponent";
import {Matrix2D} from "../math/mat2d/Matrix2D";
import {Rectangle} from "../geom/rectangle/Rectangle";
import {ReparentChildren} from "../display/ReparentChildren";
import {TRANSFORM_CONST} from "../components/transform/TRANSFORM_CONST";
import {Vec2} from "../math/vec2/Vec2";
export class GameObject {
  constructor(x = 0, y = 0) {
    this.type = "GameObject";
    this.name = "";
    this.willUpdate = true;
    this.willUpdateChildren = true;
    this.willRender = true;
    this.willRenderChildren = true;
    this.willCacheChildren = false;
    this.dirty = 0;
    this.dirtyFrame = 0;
    this.visible = true;
    this.children = [];
    this.vertices = [];
    this.events = new Map();
    this.localTransform = new Matrix2D();
    this.worldTransform = new Matrix2D();
    this.transformData = new Float32Array([x, y, 0, 1, 1, 0, 0, GetDefaultOriginX(), GetDefaultOriginY(), 0]);
    this.transformExtent = new Rectangle();
    this.bounds = new BoundsComponent(this);
    this.input = new InputComponent(this);
    this.dirty = DIRTY_CONST.DEFAULT;
    this.updateLocalTransform();
    this.updateWorldTransform();
  }
  isRenderable() {
    return this.visible && this.willRender;
  }
  isDirty(flag) {
    return (this.dirty & flag) !== 0;
  }
  clearDirty(flag) {
    if (this.isDirty(flag)) {
      this.dirty ^= flag;
    }
    return this;
  }
  setDirty(flag, flag2) {
    if (!this.isDirty(flag)) {
      this.dirty ^= flag;
      this.dirtyFrame = GameInstance.getFrame();
    }
    if (!this.isDirty(flag2)) {
      this.dirty ^= flag2;
    }
    return this;
  }
  update(delta, time) {
    if (this.willUpdateChildren) {
      const children = this.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child && child.willUpdate) {
          child.update(delta, time);
        }
      }
    }
    this.postUpdate(delta, time);
  }
  postUpdate(delta, time) {
  }
  renderGL(renderPass) {
  }
  renderCanvas(renderer) {
  }
  postRenderGL(renderPass) {
  }
  postRenderCanvas(renderer) {
  }
  get numChildren() {
    return this.children.length;
  }
  getBounds() {
    return this.bounds.get();
  }
  updateTransform(flag, value) {
    if (this.transformData[flag] !== value) {
      this.transformData[flag] = value;
      this.updateLocalTransform();
      this.updateWorldTransform();
    }
  }
  updateLocalTransform() {
    this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    UpdateLocalTransform(this.localTransform, this.transformData);
  }
  updateWorldTransform() {
    this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    const parentWorldTransform = this.parent ? this.parent.worldTransform : void 0;
    UpdateWorldTransform(this.localTransform, this.worldTransform, this.passthru, parentWorldTransform);
    if (this.numChildren) {
      const children = this.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.updateWorldTransform();
      }
    }
  }
  setExtent(x, y, width, height) {
    this.transformExtent.set(x, y, width, height);
    this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
  }
  updateExtent(width, height) {
    const extent = this.transformExtent;
    if (width !== void 0) {
      extent.width = width;
    }
    if (height !== void 0) {
      extent.height = height;
    }
    extent.x = -this.originX * extent.width;
    extent.y = -this.originY * extent.height;
    this.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
  }
  setSize(width, height = width) {
    this.updateExtent(width, height);
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
    const transformData = this.transformData;
    transformData[TRANSFORM_CONST.ORIGIN_X] = x;
    transformData[TRANSFORM_CONST.ORIGIN_Y] = y;
    this.updateExtent();
    return this;
  }
  getSize(out = new Vec2()) {
    return GetRectangleSize(this.transformExtent, out);
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
    this.updateExtent(value);
  }
  get width() {
    return this.transformExtent.width;
  }
  set height(value) {
    this.updateExtent(void 0, value);
  }
  get height() {
    return this.transformExtent.height;
  }
  set x(value) {
    this.updateTransform(TRANSFORM_CONST.X, value);
  }
  get x() {
    return this.transformData[TRANSFORM_CONST.X];
  }
  set y(value) {
    this.updateTransform(TRANSFORM_CONST.Y, value);
  }
  get y() {
    return this.transformData[TRANSFORM_CONST.Y];
  }
  set originX(value) {
    const transformData = this.transformData;
    if (value !== transformData[TRANSFORM_CONST.ORIGIN_X]) {
      transformData[TRANSFORM_CONST.ORIGIN_X] = value;
      this.updateExtent();
    }
  }
  get originX() {
    return this.transformData[TRANSFORM_CONST.ORIGIN_X];
  }
  set originY(value) {
    const transformData = this.transformData;
    if (value !== transformData[TRANSFORM_CONST.ORIGIN_Y]) {
      transformData[TRANSFORM_CONST.ORIGIN_Y] = value;
      this.updateExtent();
    }
  }
  get originY() {
    return this.transformData[TRANSFORM_CONST.ORIGIN_Y];
  }
  set skewX(value) {
    this.updateTransform(TRANSFORM_CONST.SKEW_X, value);
  }
  get skewX() {
    return this.transformData[TRANSFORM_CONST.SKEW_X];
  }
  set skewY(value) {
    this.updateTransform(TRANSFORM_CONST.SKEW_Y, value);
  }
  get skewY() {
    return this.transformData[TRANSFORM_CONST.SKEW_Y];
  }
  set scaleX(value) {
    this.updateTransform(TRANSFORM_CONST.SCALE_X, value);
  }
  get scaleX() {
    return this.transformData[TRANSFORM_CONST.SCALE_X];
  }
  set scaleY(value) {
    this.updateTransform(TRANSFORM_CONST.SCALE_Y, value);
  }
  get scaleY() {
    return this.transformData[TRANSFORM_CONST.SCALE_Y];
  }
  set rotation(value) {
    this.updateTransform(TRANSFORM_CONST.ROTATION, value);
  }
  get rotation() {
    return this.transformData[TRANSFORM_CONST.ROTATION];
  }
  set passthru(value) {
    this.updateTransform(TRANSFORM_CONST.PASSTHRU, Number(value));
  }
  get passthru() {
    return Boolean(this.transformData[TRANSFORM_CONST.PASSTHRU]);
  }
  destroy(reparentChildren) {
    if (reparentChildren) {
      ReparentChildren(this, reparentChildren);
    } else {
      DestroyChildren(this);
    }
    Emit(this, DestroyEvent, this);
    this.bounds.destroy();
    this.input.destroy();
    this.events.clear();
    this.world = null;
    this.parent = null;
    this.children = null;
    this.vertices = [];
  }
}
