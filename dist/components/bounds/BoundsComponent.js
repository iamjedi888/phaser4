import {DIRTY_CONST} from "../../gameobjects/DIRTY_CONST";
import {GetVertices} from "../transform/GetVertices";
import {Rectangle} from "../../geom/rectangle/Rectangle";
export class BoundsComponent {
  constructor(entity) {
    this.fixed = false;
    this.includeChildren = true;
    this.visibleOnly = true;
    this.entity = entity;
    this.area = new Rectangle();
  }
  set(x, y, width, height) {
    this.area.set(x, y, width, height);
  }
  get() {
    if (this.entity.isDirty(DIRTY_CONST.BOUNDS) && !this.fixed) {
      this.update();
    }
    return this.area;
  }
  updateLocal() {
    const {x0, y0, x1, y1, x2, y2, x3, y3} = GetVertices(this.entity.worldTransform, this.entity.transformExtent);
    const x = Math.min(x0, x1, x2, x3);
    const y = Math.min(y0, y1, y2, y3);
    const right = Math.max(x0, x1, x2, x3);
    const bottom = Math.max(y0, y1, y2, y3);
    return this.area.set(x, y, right - x, bottom - y);
  }
  update() {
    const bounds = this.updateLocal();
    this.entity.clearDirty(DIRTY_CONST.BOUNDS);
    if (!this.includeChildren || !this.entity.numChildren) {
      return bounds;
    }
    const visibleOnly = this.visibleOnly;
    const children = this.entity.children;
    let x = bounds.x;
    let y = bounds.y;
    let right = bounds.right;
    let bottom = bounds.bottom;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!child || visibleOnly && !child.visible) {
        continue;
      }
      const childBounds = child.bounds.get();
      if (childBounds.x < x) {
        x = childBounds.x;
      }
      if (childBounds.y < y) {
        y = childBounds.y;
      }
      if (childBounds.right > right) {
        right = childBounds.right;
      }
      if (childBounds.bottom > bottom) {
        bottom = childBounds.bottom;
      }
    }
    return bounds.set(x, y, right - x, bottom - y);
  }
  destroy() {
    this.entity = null;
    this.area = null;
  }
}
