var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { DIRTY_CONST } from "../DIRTY_CONST";
import { DrawTexturedQuad } from "../../renderer/webgl1/draw/DrawTexturedQuad";
import { Flush } from "../../renderer/webgl1/renderpass/Flush";
import { PopFramebuffer } from "../../renderer/webgl1/renderpass/PopFramebuffer";
import { RenderLayer } from "../renderlayer/RenderLayer";
export class EffectLayer extends RenderLayer {
  constructor(...shaders) {
    super();
    __publicField(this, "shaders", []);
    if (Array.isArray(shaders)) {
      this.shaders = shaders;
    }
  }
  postRenderGL(renderPass) {
    const shaders = this.shaders;
    const texture = this.texture;
    Flush(renderPass);
    PopFramebuffer(renderPass);
    if (shaders.length === 0) {
      DrawTexturedQuad(renderPass, texture);
    } else {
      let prevTexture = texture;
      for (let i = 0; i < shaders.length; i++) {
        const shader = shaders[i];
        DrawTexturedQuad(renderPass, prevTexture, shader);
        prevTexture = shader.texture;
      }
      DrawTexturedQuad(renderPass, prevTexture);
    }
    this.clearDirty(DIRTY_CONST.TRANSFORM);
  }
}
