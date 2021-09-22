var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { AddBanner } from "./config/banner/AddBanner";
import { AddGlobalVar } from "./config/globalvar/AddGlobalVar";
import { AddToParent } from "./config/parent/AddToParent";
import { CreateRenderer } from "./config/renderer/CreateRenderer";
import { CreateSceneManager } from "./scenes/CreateSceneManager";
import { CreateTextureManager } from "./textures/CreateTextureManager";
import { CreateWorldRenderData } from "./world/CreateWorldRenderData";
import { DOMContentLoaded } from "./dom/DOMContentLoaded";
import { Emit } from "./events/Emit";
import { EventEmitter } from "./events/EventEmitter";
import { GameInstance } from "./GameInstance";
import { GameObjectWorld } from "./GameObjectWorld";
import { RendererInstance } from "./renderer/RendererInstance";
import { ResetWorldRenderData } from "./world/ResetWorldRenderData";
import { SceneManagerInstance } from "./scenes";
import { SetConfigDefaults } from "./config/SetConfigDefaults";
import { Time } from "./components/timer/Time";
import { addEntity } from "bitecs";
export class Game extends EventEmitter {
  constructor(...settings) {
    super();
    __publicField(this, "id", addEntity(GameObjectWorld));
    __publicField(this, "time");
    __publicField(this, "isBooted", false);
    __publicField(this, "isPaused", false);
    __publicField(this, "willUpdate", true);
    __publicField(this, "willRender", true);
    __publicField(this, "renderStats");
    this.time = new Time();
    GameInstance.set(this);
    SetConfigDefaults();
    DOMContentLoaded(() => this.boot(settings));
  }
  boot(settings) {
    settings.forEach((setting) => setting());
    CreateRenderer();
    CreateTextureManager();
    CreateSceneManager();
    AddBanner();
    AddGlobalVar(this);
    AddToParent();
    this.isBooted = true;
    this.renderStats = CreateWorldRenderData();
    Emit(this, "boot");
    requestAnimationFrame((now) => this.step(now));
  }
  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
    this.time.resetLastTick();
  }
  update(delta, time) {
  }
  render(renderPass, delta, time) {
  }
  step(now) {
    const renderer = RendererInstance.get();
    const sceneManager = SceneManagerInstance.get();
    const time = this.time;
    ResetWorldRenderData(this.renderStats);
    time.update(now);
    if (!this.isPaused) {
      const delta = time.delta;
      if (this.willUpdate) {
        sceneManager.update();
        this.update(delta, now);
        Emit(this, "update", delta, now);
      }
      if (this.willRender) {
        sceneManager.preRender();
        renderer.begin(sceneManager.flush);
        const renderPass = renderer.renderPass;
        sceneManager.render(renderPass);
        this.render(renderPass, delta, now);
        Emit(this, "render", renderPass, delta, now);
        renderer.end();
      }
    }
    time.updateDelta(now);
    Emit(this, "step");
    this.renderStats.fps = time.fps;
    this.renderStats.delta = time.delta;
    requestAnimationFrame((now2) => this.step(now2));
  }
  destroy() {
  }
}
