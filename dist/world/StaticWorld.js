import {BaseWorld} from "./BaseWorld";
import {CreateWorldRenderData} from "./CreateWorldRenderData";
import {StaticCamera} from "../camera/StaticCamera";
export class StaticWorld extends BaseWorld {
  constructor(scene) {
    super(scene);
    this.type = "StaticWorld";
    this.camera = new StaticCamera();
    this.renderData = CreateWorldRenderData(this, this.camera);
  }
}
