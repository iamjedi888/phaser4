var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { HIERARCHY, HierarchyComponent } from "../components/hierarchy/HierarchyComponent";
import { AddDirtyComponent } from "../components/dirty/AddDirtyComponent";
import { AddHierarchyComponent } from "../components/hierarchy/AddHierarchyComponent";
import { AddPermissionsComponent } from "../components/permissions/AddPermissionsComponent";
import { DestroyChildren } from "../display/DestroyChildren";
import { GameObjectCache } from "./GameObjectCache";
import { GameObjectWorld } from "../GameObjectWorld";
import { GetChildrenFromParentID } from "../components/hierarchy/GetChildrenFromParentID";
import { GetNumChildren } from "../components/hierarchy/GetNumChildren";
import { GetParentGameObject } from "../components/hierarchy/GetParentGameObject";
import { GetParentID } from "../components/hierarchy/GetParentID";
import { GetVisible } from "../components/permissions/GetVisible";
import { GetVisibleChildren } from "../components/permissions/GetVisibleChildren";
import { ReparentChildren } from "../display/ReparentChildren";
import { SetVisible } from "../components/permissions/SetVisible";
import { SetVisibleChildren } from "../components/permissions/SetVisibleChildren";
import { WillRender } from "../components/permissions/WillRender";
import { addEntity } from "bitecs";
export class GameObject {
  constructor() {
    __publicField(this, "id", addEntity(GameObjectWorld));
    __publicField(this, "type", "GameObject");
    __publicField(this, "name", "");
    __publicField(this, "events");
    const id = this.id;
    AddHierarchyComponent(id);
    AddPermissionsComponent(id);
    AddDirtyComponent(id);
    GameObjectCache.set(id, this);
  }
  isRenderable() {
    return WillRender(this.id);
  }
  beforeUpdate(delta, time) {
  }
  update(delta, time) {
  }
  afterUpdate(delta, time) {
  }
  preRenderGL(renderPass) {
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
    SetVisible(this.id, value);
  }
  get visible() {
    return GetVisible(this.id);
  }
  set visibleChildren(value) {
    SetVisibleChildren(this.id, value);
  }
  get visibleChildren() {
    return GetVisibleChildren(this.id);
  }
  hasParent(id) {
    const parentID = GetParentID(this.id);
    if (id) {
      return parentID === id;
    } else {
      return parentID > 0;
    }
  }
  getParent() {
    return GetParentGameObject(this.id);
  }
  getChildren(renderPass) {
    return GetChildrenFromParentID(this.id);
  }
  getNumChildren() {
    return GetNumChildren(this.id);
  }
  onAddChild(childID) {
  }
  onUpdateChild(childID) {
  }
  onRemoveChild(childID) {
  }
  getDisplayData() {
    const id = this.id;
    const data = HierarchyComponent.data[id];
    return {
      id,
      parent: data[HIERARCHY.PARENT],
      world: data[HIERARCHY.WORLD],
      numChildren: data[HIERARCHY.NUM_CHILDREN]
    };
  }
  toString() {
    return `${this.type} id="${this.id}" name="${this.name}"`;
  }
  destroy(reparentChildren) {
    if (reparentChildren) {
      ReparentChildren(this, reparentChildren);
    } else {
      DestroyChildren(this);
    }
  }
}
