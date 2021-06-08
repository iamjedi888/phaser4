var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BaseWorld } from "./BaseWorld";
import { CreateWorldRenderData } from "./CreateWorldRenderData";
import { StaticCamera } from "../camera/StaticCamera";
export class StaticWorld extends BaseWorld {
  constructor(scene) {
    super(scene);
    __publicField(this, "camera");
    this.camera = new StaticCamera();
    this.renderData = CreateWorldRenderData(this, this.camera);
  }
}
