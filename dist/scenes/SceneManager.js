var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GameInstance } from "../GameInstance";
import { GameObjectWorld } from "../GameObjectWorld";
import { GetScenes } from "../config/scenes/GetScenes";
import { Once } from "../events/Once";
import { SceneManagerInstance } from "./SceneManagerInstance";
import { WorldList } from "../world/WorldList";
import { addEntity } from "bitecs";
export class SceneManager {
  constructor() {
    __publicField(this, "id", addEntity(GameObjectWorld));
    __publicField(this, "game");
    __publicField(this, "scenes", new Map());
    __publicField(this, "sceneIndex", 0);
    __publicField(this, "flush");
    SceneManagerInstance.set(this);
    this.game = GameInstance.get();
    Once(this.game, "boot", () => this.boot());
  }
  boot() {
    const scenes = GetScenes();
    if (scenes) {
      scenes.forEach((scene) => new scene());
    }
  }
  update() {
    const time = this.game.time;
    const delta = time.delta;
    const now = time.lastTick;
    for (const scene of this.scenes.values()) {
      const worlds = WorldList.get(scene);
      for (const world of worlds) {
        world.beforeUpdate(delta, now);
      }
      if (scene.update) {
        scene.update(delta, now);
      }
      for (const world of worlds) {
        world.update(delta, now);
      }
      for (const world of worlds) {
        world.afterUpdate(delta, now);
      }
    }
  }
  preRender() {
    const gameFrame = this.game.time.frame;
    for (const scene of this.scenes.values()) {
      const worlds = WorldList.get(scene);
      for (const world of worlds) {
        if (world.preRender(gameFrame)) {
          this.flush = true;
        }
      }
    }
  }
  render(renderPass) {
    for (const scene of this.scenes.values()) {
      const worlds = WorldList.get(scene);
      for (const world of worlds) {
        world.renderGL(renderPass);
      }
    }
    this.flush = false;
  }
}
