var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GameInstance } from "../GameInstance";
import { Install } from "./Install";
export class Scene {
  constructor(config) {
    __publicField(this, "key");
    __publicField(this, "game");
    __publicField(this, "events");
    this.game = GameInstance.get();
    this.events = new Map();
    Install(this, config);
  }
}
