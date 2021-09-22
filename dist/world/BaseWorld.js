var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import * as WorldEvents from "./events";
import { defineComponent, defineQuery } from "bitecs";
import { Color } from "../components/color/Color";
import { CreateWorldRenderData } from "./CreateWorldRenderData";
import { Emit } from "../events/Emit";
import { GameObject } from "../gameobjects/GameObject";
import { GameObjectWorld } from "../GameObjectWorld";
import { Once } from "../events/Once";
import { RemoveChildren } from "../display/RemoveChildren";
import { ResetWorldRenderData } from "./ResetWorldRenderData";
import { SceneDestroyEvent } from "../scenes/events/SceneDestroyEvent";
import { SetWillCacheChildren } from "../components/permissions/SetWillCacheChildren";
import { SetWillTransformChildren } from "../components/permissions/SetWillTransformChildren";
import { SetWorldID } from "../components/hierarchy/SetWorldID";
import { UpdateWorld } from "./UpdateWorld";
import { WorldList } from "./WorldList";
export class BaseWorld extends GameObject {
  constructor(scene) {
    super();
    __publicField(this, "type", "BaseWorld");
    __publicField(this, "tag", defineComponent());
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "is3D", false);
    __publicField(this, "updateDisplayList", true);
    __publicField(this, "color");
    __publicField(this, "renderData");
    __publicField(this, "stack");
    __publicField(this, "totalChildren", 0);
    __publicField(this, "totalChildrenQuery");
    const id = this.id;
    const tag = this.tag;
    this.scene = scene;
    this.totalChildrenQuery = defineQuery([tag]);
    SetWorldID(id, id);
    WorldList.get(scene).push(this);
    this.color = new Color(id);
    this.events = new Map();
    this.renderData = CreateWorldRenderData();
    this.stack = new Uint32Array(256);
    SetWillTransformChildren(id, false);
    SetWillCacheChildren(id, false);
    Once(scene, SceneDestroyEvent, () => this.destroy());
  }
  getNumChildren() {
    if (this.updateDisplayList) {
      this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
      this.updateDisplayList = false;
    }
    return this.totalChildren;
  }
  beforeUpdate(delta, time) {
    ResetWorldRenderData(this.renderData);
    Emit(this, WorldEvents.WorldBeforeUpdateEvent, delta, time, this);
  }
  update(delta, time) {
    UpdateWorld(this, delta, time);
  }
  afterUpdate(delta, time) {
    Emit(this, WorldEvents.WorldAfterUpdateEvent, delta, time, this);
  }
  preRender(gameFrame) {
    return true;
  }
  renderGL(renderPass) {
  }
  shutdown() {
    RemoveChildren(this);
    Emit(this, WorldEvents.WorldShutdownEvent, this);
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.shutdown();
    if (this.camera) {
      this.camera.destroy();
    }
    this.camera = null;
  }
}
