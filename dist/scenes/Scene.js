import {GameInstance} from "../GameInstance";
import {Install} from "./Install";
export class Scene {
  constructor(config) {
    this.game = GameInstance.get();
    this.events = new Map();
    Install(this, config);
  }
}
