var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { AddVertex } from "../../components/vertices/AddVertex";
import { BatchTexturedQuad } from "../../renderer/webgl1/draw/BatchTexturedQuad";
import { Container } from "../container/Container";
import { DrawImage } from "../../renderer/canvas/draw/DrawImage";
import { GameObjectWorld } from "../../GameObjectWorld";
import { PreRenderVertices } from "../../components/transform/PreRenderVertices";
import { QuadVertexComponent } from "../../components/vertices/QuadVertexComponent";
import { SetDirtyVertexColors } from "../../components/dirty";
import { SetFrame } from "./SetFrame";
import { SetTexture } from "./SetTexture";
import { WillRender } from "../../components/permissions";
import { addComponent } from "bitecs";
export class Sprite extends Container {
  constructor(x, y, texture, frame) {
    super(x, y);
    __publicField(this, "texture");
    __publicField(this, "frame");
    __publicField(this, "hasTexture", false);
    __publicField(this, "_tint", 16777215);
    const id = this.id;
    addComponent(GameObjectWorld, QuadVertexComponent, id);
    QuadVertexComponent.v1[id] = AddVertex();
    QuadVertexComponent.v2[id] = AddVertex();
    QuadVertexComponent.v3[id] = AddVertex();
    QuadVertexComponent.v4[id] = AddVertex();
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
    BatchTexturedQuad(this.texture, this.id, renderPass);
  }
  renderCanvas(renderer) {
    PreRenderVertices(this);
    DrawImage(this.frame, this.alpha, this.worldTransform, this.transformExtent, renderer);
  }
  get tint() {
    return this._tint;
  }
  set tint(value) {
    if (value !== this._tint) {
      this._tint = value;
      SetDirtyVertexColors(this.id);
    }
  }
  destroy(reparentChildren) {
    super.destroy(reparentChildren);
    this.texture = null;
    this.frame = null;
    this.hasTexture = false;
  }
}
