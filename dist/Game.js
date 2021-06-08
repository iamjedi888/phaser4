var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { AddToDOM, DOMContentLoaded } from "./dom";
import { Emit, EventEmitter } from "./events";
import { GameInstance } from "./GameInstance";
import { GameObjectWorld } from "./GameObjectWorld";
import { GetBanner } from "./config/banner";
import { GetGlobalVar } from "./config/globalvar";
import { GetParent } from "./config/parent";
import { GetRenderer } from "./config/renderer";
import { SceneManager } from "./scenes/SceneManager";
import { SetConfigDefaults } from "./config/SetConfigDefaults";
import { TextureManager } from "./textures/TextureManager";
import { addEntity } from "bitecs";
export class Game extends EventEmitter {
  constructor(...settings) {
    super();
    __publicField(this, "id", addEntity(GameObjectWorld));
    __publicField(this, "VERSION", "4.0.0-beta1");
    __publicField(this, "isBooted", false);
    __publicField(this, "isPaused", false);
    __publicField(this, "willUpdate", true);
    __publicField(this, "willRender", true);
    __publicField(this, "lastTick", 0);
    __publicField(this, "elapsed", 0);
    __publicField(this, "frame", 0);
    __publicField(this, "renderer");
    __publicField(this, "textureManager");
    __publicField(this, "sceneManager");
    GameInstance.set(this);
    SetConfigDefaults();
    DOMContentLoaded(() => this.boot(settings));
  }
  boot(settings) {
    settings.forEach((setting) => setting());
    const renderer = GetRenderer();
    this.renderer = new renderer();
    this.textureManager = new TextureManager();
    this.sceneManager = new SceneManager();
    const parent = GetParent();
    if (parent) {
      AddToDOM(this.renderer.canvas, parent);
    }
    const globalVar = GetGlobalVar();
    if (globalVar && window) {
      window[globalVar] = this;
    }
    this.isBooted = true;
    GetBanner();
    Emit(this, "boot");
    this.lastTick = performance.now();
    this.step(this.lastTick);
  }
  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
    this.lastTick = performance.now();
  }
  step(time) {
    const delta = time - this.lastTick;
    this.lastTick = time;
    this.elapsed += delta;
    const renderer = this.renderer;
    const sceneManager = this.sceneManager;
    if (!this.isPaused) {
      if (this.willUpdate) {
        sceneManager.update(delta, time, this.frame);
      }
      if (this.willRender) {
        sceneManager.preRender(this.frame);
        renderer.render(sceneManager.flush, sceneManager.scenes);
        sceneManager.flush = false;
      }
    }
    Emit(this, "step");
    this.frame++;
    GameInstance.setFrame(this.frame);
    GameInstance.setElapsed(this.elapsed);
    requestAnimationFrame((now) => this.step(now));
  }
  destroy() {
  }
}
