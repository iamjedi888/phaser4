import {AddToDOM, DOMContentLoaded} from "./dom";
import {Emit, EventEmitter} from "./events";
import {GameInstance} from "./GameInstance";
import {GetBanner} from "./config/banner";
import {GetGlobalVar} from "./config/globalvar";
import {GetParent} from "./config/parent";
import {GetRenderer} from "./config/renderer";
import {SceneManager} from "./scenes/SceneManager";
import {SetConfigDefaults} from "./config/SetConfigDefaults";
import {TextureManager} from "./textures/TextureManager";
export class Game extends EventEmitter {
  constructor(...settings) {
    super();
    this.VERSION = "4.0.0-beta1";
    this.isBooted = false;
    this.isPaused = false;
    this.willUpdate = true;
    this.willRender = true;
    this.lastTick = 0;
    this.elapsed = 0;
    this.frame = 0;
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
    if (!this.isPaused) {
      if (this.willUpdate) {
        this.sceneManager.update(delta, time);
        Emit(this, "update", delta, time);
      }
      if (this.willRender) {
        this.renderer.render(this.sceneManager.render(this.frame));
      }
    }
    this.frame++;
    GameInstance.setFrame(this.frame);
    GameInstance.setElapsed(this.elapsed);
    requestAnimationFrame((now) => this.step(now));
  }
  destroy() {
  }
}
