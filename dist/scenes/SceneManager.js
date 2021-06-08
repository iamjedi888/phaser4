var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Changed, addEntity, defineQuery } from "bitecs";
import { AddRenderStatsComponent } from "./AddRenderStatsComponent";
import { GameInstance } from "../GameInstance";
import { GameObjectWorld } from "../GameObjectWorld";
import { GetScenes } from "../config/scenes";
import { LocalMatrix2DComponent } from "../components/transform";
import { Once } from "../events";
import { RenderStatsComponent } from "./RenderStatsComponent";
import { ResetRenderStats } from "./ResetRenderStats";
import { SceneManagerInstance } from "./SceneManagerInstance";
import { UpdateLocalTransform2DSystem } from "../components/transform/UpdateLocalTransform2DSystem";
import { UpdateVertexPositionSystem } from "../components/vertices/UpdateVertexPositionSystem";
import { WorldList } from "../world/WorldList";
export class SceneManager {
  constructor() {
    __publicField(this, "id", addEntity(GameObjectWorld));
    __publicField(this, "game");
    __publicField(this, "scenes", new Map());
    __publicField(this, "sceneIndex", 0);
    __publicField(this, "flush");
    __publicField(this, "changedMatrixQuery", defineQuery([Changed(LocalMatrix2DComponent)]));
    this.game = GameInstance.get();
    SceneManagerInstance.set(this);
    AddRenderStatsComponent(this.id);
    Once(this.game, "boot", () => this.boot());
  }
  boot() {
    GetScenes().forEach((scene) => new scene());
  }
  update(delta, time, gameFrame) {
    let sceneTotal = 0;
    let worldTotal = 0;
    for (const scene of this.scenes.values()) {
      const worlds = WorldList.get(scene);
      for (const world of worlds) {
        world.beforeUpdate(delta, time);
        world.update(delta, time);
        world.afterUpdate(delta, time);
        worldTotal++;
      }
      sceneTotal++;
    }
    const localTransforms = UpdateLocalTransform2DSystem(GameObjectWorld);
    ResetRenderStats(this.id, gameFrame, sceneTotal, worldTotal, localTransforms.length);
  }
  preRender(gameFrame) {
    const dirtyTransforms = this.changedMatrixQuery(GameObjectWorld);
    let dirtyWorld = false;
    for (const scene of this.scenes.values()) {
      const worlds = WorldList.get(scene);
      for (const world of worlds) {
        if (world.preRender(gameFrame, dirtyTransforms)) {
          dirtyWorld = true;
        }
      }
    }
    const verts = UpdateVertexPositionSystem(GameObjectWorld);
    RenderStatsComponent.numDirtyVertices[this.id] = verts.length;
    if (dirtyWorld) {
      this.flush = true;
    }
  }
  updateWorldStats(numGameObjects, numRendered, numDisplayLists, numWorldTransforms) {
    const id = this.id;
    RenderStatsComponent.numGameObjects[id] += numGameObjects;
    RenderStatsComponent.numGameObjectsRendered[id] += numRendered;
    RenderStatsComponent.numDirtyWorldLists[id] += numDisplayLists;
    RenderStatsComponent.numDirtyWorldTransforms[id] += numWorldTransforms;
  }
}
