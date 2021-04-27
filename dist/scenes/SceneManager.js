import {Emit, Once} from "../events";
import {CreateSceneRenderData} from "./CreateSceneRenderData";
import {GameInstance} from "../GameInstance";
import {GetScenes} from "../config/scenes";
import {ResetSceneRenderData} from "./ResetSceneRenderData";
import {SceneManagerInstance} from "./SceneManagerInstance";
export class SceneManager {
  constructor() {
    this.scenes = new Map();
    this.sceneIndex = 0;
    this.flush = false;
    this.renderResult = CreateSceneRenderData();
    this.game = GameInstance.get();
    SceneManagerInstance.set(this);
    Once(this.game, "boot", () => this.boot());
  }
  boot() {
    GetScenes().forEach((scene) => new scene());
  }
  update(delta, time) {
    for (const scene of this.scenes.values()) {
      Emit(scene, "update", delta, time);
    }
  }
  render(gameFrame) {
    const results = this.renderResult;
    ResetSceneRenderData(results, gameFrame);
    for (const scene of this.scenes.values()) {
      Emit(scene, "render", results);
    }
    if (this.flush) {
      results.numDirtyFrames++;
      this.flush = false;
    }
    return results;
  }
}
