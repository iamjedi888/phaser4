import {Texture} from "../Texture";
export class RenderTexture extends Texture {
  constructor(renderer, width = 256, height = width) {
    super(null, width, height);
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
