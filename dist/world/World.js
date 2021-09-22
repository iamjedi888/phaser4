var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BaseWorld } from "./BaseWorld";
import { GetRenderList } from "./RenderGLNode";
import { PreRenderWorld } from "./PreRenderWorld";
import { RenderGLWorld } from "./RenderGLWorld";
import { RendererInstance } from "../renderer/RendererInstance";
import { WorldCamera } from "../camera/WorldCamera";
export class World extends BaseWorld {
  constructor(scene) {
    super(scene);
    __publicField(this, "type", "World");
    const renderer = RendererInstance.get();
    this.camera = new WorldCamera(renderer.width, renderer.height);
  }
  preRender(gameFrame) {
    return PreRenderWorld(this, gameFrame);
  }
  renderGL(renderPass) {
    RenderGLWorld(this, renderPass);
  }
  getRenderList() {
    return GetRenderList();
  }
}
