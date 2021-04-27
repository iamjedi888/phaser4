import {DIRTY_CONST} from "../DIRTY_CONST";
import {DrawTexturedQuad} from "../../renderer/webgl1/draw/DrawTexturedQuad";
import {Flush} from "../../renderer/webgl1/renderpass/Flush";
import {PopFramebuffer} from "../../renderer/webgl1/renderpass/PopFramebuffer";
import {RenderLayer} from "../renderlayer/RenderLayer";
export class EffectLayer extends RenderLayer {
  constructor(...shaders) {
    super();
    this.shaders = [];
    this.type = "EffectLayer";
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
