import {DIRTY_CONST} from "../gameobjects/DIRTY_CONST";
import {DestroyEvent} from "../gameobjects/events";
import {Emit} from "../events";
import {GameInstance} from "../GameInstance";
import {Transform3DComponent} from "./components/transform3d/Transform3DComponent";
export class GameObject3D {
  constructor(x = 0, y = 0, z = 0) {
    this.type = "GameObject3D";
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
    this.events = new Map();
    this.transform = new Transform3DComponent(this, x, y, z);
    this.dirty = DIRTY_CONST.DEFAULT;
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
  postRenderGL(renderPass) {
  }
  get numChildren() {
    return this.children.length;
  }
  destroy(reparentChildren) {
    if (reparentChildren) {
    } else {
    }
    Emit(this, DestroyEvent, this);
    this.transform.destroy();
    this.events.clear();
    this.world = null;
    this.parent = null;
    this.children = null;
  }
}
