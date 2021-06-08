var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BaseWorld } from "./BaseWorld";
import { Camera } from "../camera/Camera";
import { CreateWorldRenderData } from "./CreateWorldRenderData";
export class World extends BaseWorld {
  constructor(scene) {
    super(scene);
    __publicField(this, "camera");
    __publicField(this, "enableCameraCull", true);
    this.camera = new Camera();
    this.renderData = CreateWorldRenderData(this, this.camera);
  }
}
