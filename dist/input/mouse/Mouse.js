var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Emit } from "../../events/Emit";
import { EventEmitter } from "../../events/EventEmitter";
import { RendererInstance } from "../../renderer/RendererInstance";
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
      target = RendererInstance.get().canvas;
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
