import {BoundsComponent} from "./components/bounds/BoundsComponent";
import {DIRTY_CONST} from "./DIRTY_CONST";
import {DestroyChildren} from "../display/DestroyChildren";
import {DestroyEvent} from "./events/DestroyEvent";
import {Emit} from "../events/Emit";
import {GameInstance} from "../GameInstance";
import {InputComponent} from "./components/input/InputComponent";
import {ReparentChildren} from "../display/ReparentChildren";
import {TransformComponent} from "./components/transform/TransformComponent";
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
    this.transform = new TransformComponent(this, x, y);
    this.bounds = new BoundsComponent(this);
    this.input = new InputComponent(this);
    this.dirty = DIRTY_CONST.DEFAULT;
    this.transform.update();
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
  destroy(reparentChildren) {
    if (reparentChildren) {
      ReparentChildren(this, reparentChildren);
    } else {
      DestroyChildren(this);
    }
    Emit(this, DestroyEvent, this);
    this.transform.destroy();
    this.bounds.destroy();
    this.input.destroy();
    this.events.clear();
    this.world = null;
    this.parent = null;
    this.children = null;
    this.vertices = [];
  }
}
