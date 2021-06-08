var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import * as WorldEvents from "./events";
import { Begin, Flush } from "../renderer/webgl1/renderpass";
import { Changed, defineComponent, defineQuery } from "bitecs";
import { ClearDirtyDisplayList, HasDirtyDisplayList } from "../components/dirty";
import { Emit, Once } from "../events";
import { GameObject, GameObjectCache } from "../gameobjects";
import { GetNumWorldTransforms, ResetWorldRenderData } from "./ResetWorldRenderData";
import { AddRenderDataComponent } from "./AddRenderDataComponent";
import { AddTransform2DComponent } from "../components/transform/AddTransform2DComponent";
import { CheckDirtyTransforms } from "./CheckDirtyTransforms";
import { GameObjectWorld } from "../GameObjectWorld";
import { GetWorldSize } from "../config/worldsize";
import { Mat2dEquals } from "../math/mat2d/Mat2dEquals";
import { RebuildWorldList } from "./RebuildWorldList";
import { RebuildWorldTransforms } from "./RebuildWorldTransforms";
import { RemoveChildren } from "../display";
import { SceneDestroyEvent } from "../scenes/events";
import { SceneManagerInstance } from "../scenes/SceneManagerInstance";
import { SetWorldID } from "../components/hierarchy";
import { WillUpdate } from "../components/permissions";
import { WorldList } from "./WorldList";
import { WorldMatrix2DComponent } from "../components/transform";
export class BaseWorld extends GameObject {
  constructor(scene) {
    super();
    __publicField(this, "tag", defineComponent());
    __publicField(this, "scene");
    __publicField(this, "sceneManager");
    __publicField(this, "camera");
    __publicField(this, "forceRefresh", false);
    __publicField(this, "is3D", false);
    __publicField(this, "runRender", false);
    __publicField(this, "renderList");
    __publicField(this, "listLength");
    __publicField(this, "totalChildren");
    __publicField(this, "totalChildrenQuery");
    __publicField(this, "dirtyWorldQuery");
    this.scene = scene;
    this.sceneManager = SceneManagerInstance.get();
    this.totalChildren = 0;
    this.totalChildrenQuery = defineQuery([this.tag]);
    this.dirtyWorldQuery = defineQuery([this.tag, Changed(WorldMatrix2DComponent)]);
    this.renderList = new Uint32Array(GetWorldSize() * 4);
    this.listLength = 0;
    const id = this.id;
    AddRenderDataComponent(id);
    AddTransform2DComponent(id);
    SetWorldID(id, id);
    WorldList.get(scene).push(this);
    Once(scene, SceneDestroyEvent, () => this.destroy());
  }
  beforeUpdate(delta, time) {
    Emit(this, WorldEvents.WorldBeforeUpdateEvent, delta, time, this);
  }
  update(delta, time) {
    if (!WillUpdate(this.id)) {
      return;
    }
    Emit(this, WorldEvents.WorldUpdateEvent, delta, time, this);
    super.update(delta, time);
  }
  afterUpdate(delta, time) {
    Emit(this, WorldEvents.WorldAfterUpdateEvent, delta, time, this);
  }
  addToRenderList(id, renderType) {
    let len = this.listLength;
    const list = this.renderList;
    list[len] = id;
    list[len + 1] = renderType;
    this.listLength += 2;
    len += 2;
    if (len === list.length) {
      const newList = new Uint32Array(len + GetWorldSize() * 4);
      newList.set(list, 0);
      this.renderList = newList;
    }
  }
  preRender(gameFrame, transformList) {
    const sceneManager = this.sceneManager;
    if (!this.isRenderable()) {
      this.runRender = false;
      sceneManager.updateWorldStats(this.totalChildren, 0, 0, 0);
      return false;
    }
    const id = this.id;
    const dirtyDisplayList = HasDirtyDisplayList(id);
    ResetWorldRenderData(id, gameFrame);
    let isDirty = false;
    if (dirtyDisplayList) {
      this.listLength = 0;
      RebuildWorldList(this, id);
      ClearDirtyDisplayList(id);
      isDirty = true;
      this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
    }
    if (dirtyDisplayList || CheckDirtyTransforms(id, transformList)) {
      RebuildWorldTransforms(this, id, transformList, false);
      isDirty = true;
    }
    this.camera.dirtyRender = false;
    this.runRender = this.listLength > 0;
    sceneManager.updateWorldStats(this.totalChildren, this.listLength / 4, Number(dirtyDisplayList), GetNumWorldTransforms());
    return isDirty;
  }
  getTotalChildren() {
    if (HasDirtyDisplayList(this.id)) {
      this.totalChildren = this.totalChildrenQuery(GameObjectWorld).length;
    }
    return this.totalChildren;
  }
  renderGL(renderPass) {
    Emit(this, WorldEvents.WorldRenderEvent, this);
    const currentCamera = renderPass.current2DCamera;
    const camera = this.camera;
    if (!currentCamera || !Mat2dEquals(camera.worldTransform, currentCamera.worldTransform)) {
      Flush(renderPass);
    }
    Begin(renderPass, camera);
    const list = this.renderList;
    for (let i = 0; i < this.listLength; i += 2) {
      const eid = list[i];
      const type = list[i + 1];
      const entry = GameObjectCache.get(eid);
      if (type === 1) {
        entry.postRenderGL(renderPass);
      } else {
        entry.renderGL(renderPass);
      }
    }
  }
  postRenderGL(renderPass) {
    Emit(this, WorldEvents.WorldPostRenderEvent, renderPass, this);
  }
  shutdown() {
    RemoveChildren(this);
    Emit(this, WorldEvents.WorldShutdownEvent, this);
    ResetWorldRenderData(this.id, 0);
    if (this.camera) {
      this.camera.reset();
    }
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
