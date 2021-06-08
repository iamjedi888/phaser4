var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Emit, EventEmitter } from "../../events";
import { GameInstance } from "../../GameInstance";
import { Mat2dAppend } from "../../math/mat2d/Mat2dAppend";
import { Mat2dGlobalToLocal } from "../../math/mat2d/Mat2dGlobalToLocal";
import { Vec2 } from "../../math/vec2/Vec2";
export class Mouse extends EventEmitter {
  constructor(target) {
    super();
    __publicField(this, "primaryDown", false);
    __publicField(this, "auxDown", false);
    __publicField(this, "secondaryDown", false);
    __publicField(this, "blockContextMenu", true);
    __publicField(this, "localPoint");
    __publicField(this, "hitPoint");
    __publicField(this, "target");
    __publicField(this, "resolution", 1);
    __publicField(this, "mousedownHandler");
    __publicField(this, "mouseupHandler");
    __publicField(this, "mousemoveHandler");
    __publicField(this, "mousewheelHandler");
    __publicField(this, "contextmenuHandler");
    __publicField(this, "blurHandler");
    __publicField(this, "transPoint");
    this.mousedownHandler = (event) => this.onMouseDown(event);
    this.mouseupHandler = (event) => this.onMouseUp(event);
    this.mousemoveHandler = (event) => this.onMouseMove(event);
    this.mousewheelHandler = (event) => this.onMouseWheel(event);
    this.contextmenuHandler = (event) => this.onContextMenuEvent(event);
    this.blurHandler = () => this.onBlur();
    this.localPoint = new Vec2();
    this.hitPoint = new Vec2();
    this.transPoint = new Vec2();
    if (!target) {
      target = GameInstance.get().renderer.canvas;
    }
    target.addEventListener("mousedown", this.mousedownHandler);
    target.addEventListener("mouseup", this.mouseupHandler);
    target.addEventListener("wheel", this.mousewheelHandler, { passive: false });
    target.addEventListener("contextmenu", this.contextmenuHandler);
    window.addEventListener("mouseup", this.mouseupHandler);
    window.addEventListener("mousemove", this.mousemoveHandler);
    window.addEventListener("blur", this.blurHandler);
    this.target = target;
  }
  onBlur() {
  }
  onMouseDown(event) {
    this.positionToPoint(event);
    this.primaryDown = event.button === 0;
    this.auxDown = event.button === 1;
    this.secondaryDown = event.button === 2;
    Emit(this, "pointerdown", this.localPoint.x, this.localPoint.y, event.button, event);
  }
  onMouseUp(event) {
    this.positionToPoint(event);
    this.primaryDown = !(event.button === 0);
    this.auxDown = !(event.button === 1);
    this.secondaryDown = !(event.button === 2);
    Emit(this, "pointerup", this.localPoint.x, this.localPoint.y, event.button, event);
  }
  onMouseMove(event) {
    this.positionToPoint(event);
    Emit(this, "pointermove", this.localPoint.x, this.localPoint.y, event);
  }
  onMouseWheel(event) {
    Emit(this, "wheel", event.deltaX, event.deltaY, event.deltaZ, event);
  }
  onContextMenuEvent(event) {
    if (this.blockContextMenu) {
      event.preventDefault();
    }
    Emit(this, "contextmenu", event);
  }
  positionToPoint(event) {
    return this.localPoint.set(event.offsetX, event.offsetY);
  }
  getInteractiveChildren(parent, results) {
    const children = parent.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!child.visible || !child.input.enabled) {
        continue;
      }
      results.push(child);
      if (child.input.enabledChildren && child.numChildren) {
        this.getInteractiveChildren(child, results);
      }
    }
  }
  checkHitArea(entity, px, py) {
    if (entity.input.hitArea) {
      if (entity.input.hitArea.contains(px, py)) {
        return true;
      }
    } else {
      return entity.transformExtent.contains(px, py);
    }
    return false;
  }
  hitTest(...entities) {
    const localX = this.localPoint.x;
    const localY = this.localPoint.y;
    const point = this.transPoint;
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (!entity.world) {
        continue;
      }
      const mat = Mat2dAppend(entity.world.camera.worldTransform, entity.worldTransform);
      Mat2dGlobalToLocal(mat, localX, localY, point);
      if (this.checkHitArea(entity, point.x, point.y)) {
        this.hitPoint.set(point.x, point.y);
        return true;
      }
    }
    return false;
  }
  hitTestChildren(parent, topOnly = true) {
    const output = [];
    if (!parent.visible) {
      return output;
    }
    const candidates = [];
    const parentInput = parent.input;
    if (parentInput && parentInput.enabled) {
      candidates.push(parent);
    }
    if (parentInput.enabledChildren && parent.numChildren) {
      this.getInteractiveChildren(parent, candidates);
    }
    for (let i = candidates.length - 1; i >= 0; i--) {
      const entity = candidates[i];
      if (this.hitTest(entity)) {
        output.push(entity);
        if (topOnly) {
          break;
        }
      }
    }
    return output;
  }
  shutdown() {
    const target = this.target;
    target.removeEventListener("mousedown", this.mousedownHandler);
    target.removeEventListener("mouseup", this.mouseupHandler);
    target.removeEventListener("wheel", this.mousewheelHandler);
    target.removeEventListener("contextmenu", this.contextmenuHandler);
    window.removeEventListener("mouseup", this.mouseupHandler);
    window.removeEventListener("mousemove", this.mousemoveHandler);
    window.removeEventListener("blur", this.blurHandler);
  }
}
