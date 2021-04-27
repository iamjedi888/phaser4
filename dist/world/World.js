import {BaseWorld} from "./BaseWorld";
import {Camera} from "../camera/Camera";
import {CreateWorldRenderData} from "./CreateWorldRenderData";
export class World extends BaseWorld {
  constructor(scene) {
    super(scene);
    this.enableCameraCull = true;
    this.type = "World";
    this.camera = new Camera();
    this.renderData = CreateWorldRenderData(this, this.camera);
  }
}
