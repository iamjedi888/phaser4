import {BatchTexturedQuad} from "../../renderer/webgl1/draw/BatchTexturedQuad";
import {Container} from "../container/Container";
import {DIRTY_CONST} from "../DIRTY_CONST";
import {DrawTexturedQuad} from "../../renderer/canvas/draw/DrawTexturedQuad";
import {PreRenderVertices} from "../../components/transform/PreRenderVertices";
import {TextureManagerInstance} from "../../textures/TextureManagerInstance";
import {Vertex} from "../../components/Vertex";
export class Rectangle extends Container {
  constructor(x, y, width = 64, height = 64, color = 16777215) {
    super(x, y);
    this._color = 16777215;
    this.type = "Rectangle";
    this.vertices = [new Vertex(), new Vertex(), new Vertex(), new Vertex()];
    this.color = color;
    this.setWhiteTexture();
    this.setSize(width, height);
  }
  setWhiteTexture() {
    this.texture = TextureManagerInstance.get().get("__WHITE");
    this.frame = this.texture.getFrame();
    this.frame.copyToExtent(this);
    this.frame.copyToVertices(this.vertices);
  }
  setColor(color) {
    this.color = color;
    return this;
  }
  isRenderable() {
    return this.visible && this.willRender && this.alpha > 0;
  }
  renderGL(renderPass) {
    PreRenderVertices(this);
    BatchTexturedQuad(this.texture, this.vertices, renderPass);
  }
  renderCanvas(renderer) {
    PreRenderVertices(this);
    DrawTexturedQuad(this.frame, this.alpha, this.transform, renderer);
  }
  get color() {
    return this._color;
  }
  set color(value) {
    if (value !== this._color) {
      this._color = value;
      this.vertices.forEach((vertex) => {
        vertex.setTint(value);
      });
      this.setDirty(DIRTY_CONST.COLORS);
    }
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.texture = null;
    this.frame = null;
  }
}
