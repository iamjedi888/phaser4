import {GameInstance} from "../GameInstance";
import {Mat4Identity} from "../math/mat4";
import {Matrix2D} from "../math/mat2d/Matrix2D";
import {Rectangle} from "../geom/rectangle/Rectangle";
export class StaticCamera {
  constructor() {
    this.type = "StaticCamera";
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
