var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { AddHierarchyComponent, GetChildren, GetNumChildren, GetParentGameObject, HierarchyComponent } from "../components/hierarchy";
import { AddPermissionsComponent, PermissionsComponent, WillRender, WillUpdate, WillUpdateChildren } from "../components/permissions";
import { AddDirtyComponent } from "../components/dirty/AddDirtyComponent";
import { DestroyChildren } from "../display/DestroyChildren";
import { DestroyEvent } from "./events/DestroyEvent";
import { Emit } from "../events/Emit";
import { GameObjectCache } from "./GameObjectCache";
import { GameObjectTree } from "./GameObjectTree";
import { GameObjectWorld } from "../GameObjectWorld";
import { ReparentChildren } from "../display/ReparentChildren";
import { addEntity } from "bitecs";
export class GameObject {
  constructor() {
    __publicField(this, "id", addEntity(GameObjectWorld));
    __publicField(this, "name", "");
    __publicField(this, "events");
    const id = this.id;
    AddHierarchyComponent(id);
    AddPermissionsComponent(id);
    AddDirtyComponent(id);
    GameObjectCache.set(id, this);
    GameObjectTree.set(id, []);
    this.events = new Map();
  }
  isRenderable() {
    return WillRender(this.id);
  }
  beforeUpdate(delta, time) {
  }
  update(delta, time) {
    this.beforeUpdate(delta, time);
    if (WillUpdateChildren(this.id)) {
      const children = GameObjectTree.get(this.id);
      for (let i = 0; i < children.length; i++) {
        const childID = children[i];
        if (WillUpdate(childID)) {
          GameObjectCache.get(childID).update(delta, time);
        }
      }
    }
    this.afterUpdate(delta, time);
  }
  afterUpdate(delta, time) {
  }
  renderGL(renderPass) {
  }
  renderCanvas(renderer) {
  }
  postRenderGL(renderPass) {
  }
  postRenderCanvas(renderer) {
  }
  set visible(value) {
    PermissionsComponent.visible[this.id] = Number(value);
  }
  get visible() {
    return Boolean(PermissionsComponent.visible[this.id]);
  }
  set visibleChildren(value) {
    PermissionsComponent.visibleChildren[this.id] = Number(value);
  }
  get visibleChildren() {
    return Boolean(PermissionsComponent.visibleChildren[this.id]);
  }
  set depth(value) {
    HierarchyComponent.depth[this.id] = value;
  }
  get depth() {
    return HierarchyComponent.depth[this.id];
  }
  hasParent() {
    return HierarchyComponent.parentID[this.id] > 0;
  }
  getParent() {
    return GetParentGameObject(this.id);
  }
  getChildren() {
    return GetChildren(this.id);
  }
  getNumChildren() {
    return GetNumChildren(this.id);
  }
  destroy(reparentChildren) {
    if (reparentChildren) {
      ReparentChildren(this, reparentChildren);
    } else {
      DestroyChildren(this);
    }
    Emit(this, DestroyEvent, this);
    this.events.clear();
    this.events = null;
  }
}
