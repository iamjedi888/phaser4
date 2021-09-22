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
import { SetFrame } from "./SetFrame";
import { SetShader } from "../../renderer/webgl1/renderpass/SetShader";
import { SetTexture } from "./SetTexture";
import { WillRender } from "../../components/permissions/WillRender";
export class Sprite extends Container {
  constructor(x, y, texture = "__BLANK", frame) {
    super(x, y);
    __publicField(this, "type", "Sprite");
    __publicField(this, "texture");
    __publicField(this, "frame");
    __publicField(this, "hasTexture", false);
    AddQuadVertex(this.id);
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
    return this.visible && this.hasTexture && WillRender(this.id) && this.alpha > 0;
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
    this.hasTexture = false;
  }
}
