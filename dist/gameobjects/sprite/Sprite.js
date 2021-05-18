import {BatchTexturedQuad} from "../../renderer/webgl1/draw/BatchTexturedQuad";
import {Container} from "../container/Container";
import {DIRTY_CONST} from "../DIRTY_CONST";
import {DrawTexturedQuad} from "../../renderer/canvas/draw/DrawTexturedQuad";
import {PreRenderVertices} from "../../components/transform/PreRenderVertices";
import {SetFrame} from "./SetFrame";
import {SetTexture} from "./SetTexture";
import {Vertex} from "../../components/Vertex";
export class Sprite extends Container {
  constructor(x, y, texture, frame) {
    super(x, y);
    this.hasTexture = false;
    this._tint = 16777215;
    this.type = "Sprite";
    this.vertices = [new Vertex(), new Vertex(), new Vertex(), new Vertex()];
    this.setTexture(texture, frame);
  }
  setTexture(key, frame) {
    SetTexture(key, frame, this);
    return this;
  }
  setFrame(key) {
    SetFrame(this.texture, key, this);
    return this;
  }
  isRenderable() {
    return this.visible && this.willRender && this.hasTexture && this.alpha > 0;
  }
  renderGL(renderPass) {
    PreRenderVertices(this);
    BatchTexturedQuad(this.texture, this.vertices, renderPass);
  }
  renderCanvas(renderer) {
    PreRenderVertices(this);
    DrawTexturedQuad(this.frame, this.alpha, this.worldTransform, this.transformExtent, renderer);
  }
  get tint() {
    return this._tint;
  }
  set tint(value) {
    if (value !== this._tint) {
      this._tint = value;
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
    this.hasTexture = false;
  }
}
