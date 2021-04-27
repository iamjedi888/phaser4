import * as GameObjectEvents from "../gameobjects/events";
import * as World3DEvents from "./events";
import {Emit, Off, On, Once} from "../events";
import {BuildRenderList} from "./BuildRenderList";
import {GameObject3D} from "../gameobjects3d/GameObject3D";
import {MergeRenderData} from "./MergeRenderData";
import {RemoveChildren3D} from "../display3d/RemoveChildren3D";
import {ResetWorld3DRenderData} from "./ResetWorld3DRenderData";
export class BaseWorld3D extends GameObject3D {
  constructor(scene) {
    super();
    this.forceRefresh = false;
    this.is3D = true;
    this.type = "BaseWorld";
    this.scene = scene;
    this.world = this;
    this.events = new Map();
    this.renderList = [];
    this._updateListener = On(scene, "update", (delta, time) => this.update(delta, time));
    this._renderListener = On(scene, "render", (renderData) => this.render(renderData));
    this._shutdownListener = On(scene, "shutdown", () => this.shutdown());
    Once(scene, "destroy", () => this.destroy());
  }
  update(delta, time) {
    if (!this.willUpdate) {
      return;
    }
    Emit(this, GameObjectEvents.UpdateEvent, delta, time, this);
    super.update(delta, time);
  }
  postUpdate(delta, time) {
    Emit(this, GameObjectEvents.PostUpdateEvent, delta, time, this);
  }
  render(sceneRenderData) {
    const renderData = this.renderData;
    ResetWorld3DRenderData(renderData, sceneRenderData.gameFrame);
    if (!this.willRender || !this.visible) {
      return;
    }
    BuildRenderList(this);
    Emit(this, World3DEvents.World3DRenderEvent, renderData, this);
    MergeRenderData(sceneRenderData, renderData);
  }
  renderNode(entry, renderPass) {
    entry.node.renderGL(renderPass);
    entry.children.forEach((child) => {
      if (child.children.length > 0) {
        this.renderNode(child, renderPass);
      } else {
        child.node.renderGL(renderPass);
      }
    });
    entry.node.postRenderGL(renderPass);
  }
  shutdown() {
    const scene = this.scene;
    Off(scene, "update", this._updateListener);
    Off(scene, "render", this._renderListener);
    Off(scene, "shutdown", this._shutdownListener);
    RemoveChildren3D(this);
    Emit(this, World3DEvents.World3DShutdownEvent, this);
    ResetWorld3DRenderData(this.renderData, 0);
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    Emit(this, GameObjectEvents.DestroyEvent, this);
    ResetWorld3DRenderData(this.renderData, 0);
    this.events.clear();
    this.camera = null;
    this.renderData = null;
    this.events = null;
  }
}
