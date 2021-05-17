import {GetDefaultOriginX, GetDefaultOriginY} from "../../config/defaultorigin/";
import {Vec2, Vec2Callback} from "../../math/vec2";
import {DIRTY_CONST} from "../../gameobjects/DIRTY_CONST";
import {Matrix2D} from "../../math/mat2d/Matrix2D";
import {Rectangle} from "../../geom/rectangle";
import {UpdateLocalTransform} from "./UpdateLocalTransform";
import {UpdateWorldTransform} from "./UpdateWorldTransform";
export class TransformComponent {
  constructor(entity, x = 0, y = 0) {
    this.passthru = false;
    this._rotation = 0;
    this.entity = entity;
    this.local = new Matrix2D();
    this.world = new Matrix2D();
    const update = () => this.update();
    const updateExtent = () => this.updateExtent();
    this.position = new Vec2Callback(update, x, y);
    this.scale = new Vec2Callback(update, 1, 1);
    this.skew = new Vec2Callback(update);
    this.origin = new Vec2Callback(updateExtent, GetDefaultOriginX(), GetDefaultOriginY());
    this.extent = new Rectangle();
  }
  update() {
    this.updateLocal();
    this.updateWorld();
  }
  updateLocal() {
    this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    UpdateLocalTransform(this);
  }
  updateWorld() {
    const entity = this.entity;
    entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
    UpdateWorldTransform(entity);
    if (entity.numChildren) {
      this.updateChildren();
    }
  }
  updateChildren() {
    const children = this.entity.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.transform.updateWorld();
    }
  }
  globalToLocal(x, y, out = new Vec2()) {
    const {a, b, c, d, tx, ty} = this.world;
    const id = 1 / (a * d + c * -b);
    out.x = d * id * x + -c * id * y + (ty * c - tx * d) * id;
    out.y = a * id * y + -b * id * x + (-ty * a + tx * b) * id;
    return out;
  }
  localToGlobal(x, y, out = new Vec2()) {
    const {a, b, c, d, tx, ty} = this.world;
    out.x = a * x + c * y + tx;
    out.y = b * x + d * y + ty;
    return out;
  }
  setExtent(x, y, width, height) {
    this.extent.set(x, y, width, height);
    this.entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
  }
  updateExtent(width, height) {
    const extent = this.extent;
    const entity = this.entity;
    if (width !== void 0) {
      extent.width = width;
    }
    if (height !== void 0) {
      extent.height = height;
    }
    extent.x = -this.origin.x * extent.width;
    extent.y = -this.origin.y * extent.height;
    entity.setDirty(DIRTY_CONST.TRANSFORM, DIRTY_CONST.BOUNDS);
  }
  set rotation(value) {
    if (value !== this._rotation) {
      this._rotation = value;
      this.update();
    }
  }
  get rotation() {
    return this._rotation;
  }
  destroy() {
    this.position.destroy();
    this.scale.destroy();
    this.skew.destroy();
    this.origin.destroy();
    this.entity = null;
    this.local = null;
    this.world = null;
    this.position = null;
    this.scale = null;
    this.skew = null;
    this.origin = null;
    this.extent = null;
  }
}
