var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GameInstance } from "../GameInstance";
import { Mat4Identity } from "../math/mat4";
import { Matrix2D } from "../math/mat2d/Matrix2D";
import { Rectangle } from "../geom/rectangle/Rectangle";
export class StaticCamera {
  constructor() {
    __publicField(this, "world");
    __publicField(this, "matrix");
    __publicField(this, "renderer");
    __publicField(this, "type");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "bounds");
    __publicField(this, "dirtyRender");
    __publicField(this, "worldTransform");
    this.dirtyRender = true;
    const game = GameInstance.get();
    this.renderer = game.renderer;
    this.matrix = Mat4Identity();
    this.bounds = new Rectangle();
    this.worldTransform = new Matrix2D();
    this.reset();
  }
  reset() {
    const renderer = this.renderer;
    if (renderer) {
      const width = renderer.width;
      const height = renderer.height;
      this.width = width;
      this.height = height;
    }
    this.bounds.set(0, 0, this.width, this.height);
  }
  destroy() {
    this.world = null;
    this.worldTransform = null;
    this.renderer = null;
    this.matrix = null;
    this.bounds = null;
  }
}
