var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { AddQuadVertex } from "../../components/vertices/AddQuadVertex";
import { BatchTexturedQuadBuffer } from "../../renderer/webgl1/draw/BatchTexturedQuadBuffer";
import { Container } from "../container/Container";
import { Flush } from "../../renderer/webgl1/renderpass/Flush";
import { PopColorMatrix } from "../../renderer/webgl1/renderpass/PopColorMatrix";
import { SetColorMatrix } from "../../renderer/webgl1/renderpass/SetColorMatrix";
import { SetExtentFromFrame } from "../../textures/SetExtentFromFrame";
import { SetShader } from "../../renderer/webgl1/renderpass/SetShader";
import { SetVertexUVsFromFrame } from "../../textures/SetVertexUVsFromFrame";
import { WhiteTexture } from "../../textures";
import { WillRender } from "../../components/permissions/WillRender";
export class Rectangle extends Container {
  constructor(x, y, width = 64, height = 64, color = 16777215) {
    super(x, y);
    __publicField(this, "type", "Rectangle");
    __publicField(this, "texture");
    __publicField(this, "frame");
    const id = this.id;
    AddQuadVertex(id);
    this.texture = WhiteTexture.get();
    this.frame = this.texture.getFrame();
    SetExtentFromFrame(this, this.frame);
    SetVertexUVsFromFrame(id, this.frame);
    this.size.set(width, height);
    this.color.tint = color;
  }
  isRenderable() {
    return this.visible && WillRender(this.id) && this.alpha > 0;
  }
  renderGL(renderPass) {
    const color = this.color;
    if (this.shader) {
      Flush(renderPass);
      SetShader(this.shader, 0);
    }
    if (color.colorMatrixEnabled) {
      SetColorMatrix(color);
    }
    this.preRenderGL(renderPass);
    BatchTexturedQuadBuffer(this.texture, this.id, renderPass);
    if (color.colorMatrixEnabled && !color.willColorChildren) {
      Flush(renderPass);
      PopColorMatrix();
    }
  }
  renderCanvas(renderer) {
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.texture = null;
    this.frame = null;
  }
}
