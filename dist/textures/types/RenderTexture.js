var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Texture } from "../Texture";
export class RenderTexture extends Texture {
  constructor(renderer, width = 256, height = width) {
    super(null, width, height);
    __publicField(this, "renderer");
    __publicField(this, "cameraMatrix");
    __publicField(this, "projectionMatrix");
    this.renderer = renderer;
  }
  cls() {
    return this;
  }
  batchStart() {
    return this;
  }
  batchDraw(sprites) {
    for (let i = 0, len = sprites.length; i < len; i++) {
    }
    return this;
  }
  batchEnd() {
    const renderer = this.renderer;
    renderer.reset();
    return this;
  }
  draw(...sprites) {
    this.batchStart();
    this.batchDraw(sprites);
    this.batchEnd();
    return this;
  }
}
