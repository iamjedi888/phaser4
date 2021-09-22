var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BatchTexturedQuadBuffer } from "../../renderer/webgl1/draw/BatchTexturedQuadBuffer";
import { ClearDirty } from "../../components/dirty/ClearDirty";
import { ClearDirtyChildCache } from "../../components/dirty/ClearDirtyChildCache";
import { DrawTexturedQuadFlipped } from "../../renderer/webgl1/draw/DrawTexturedQuadFlipped";
import { Flush } from "../../renderer/webgl1/renderpass/Flush";
import { GetHeight } from "../../config/size/GetHeight";
import { GetResolution } from "../../config/size/GetResolution";
import { GetWidth } from "../../config/size/GetWidth";
import { IsDirty } from "../../components/dirty/IsDirty";
import { PopFramebuffer } from "../../renderer/webgl1/renderpass/PopFramebuffer";
import { RenderLayer } from "../renderlayer/RenderLayer";
import { SetDirtyParents } from "../../components/dirty/SetDirtyParents";
import { SetInversedQuadFromCamera } from "../../components/vertices/SetInversedQuadFromCamera";
export class EffectLayer extends RenderLayer {
  constructor(width = GetWidth(), height = GetHeight(), resolution = GetResolution(), ...shaders) {
    super(0, 0, width, height, resolution);
    __publicField(this, "type", "EffectLayer");
    __publicField(this, "shaders", []);
    if (Array.isArray(shaders)) {
      this.shaders = shaders;
    }
  }
  postRenderGL(renderPass) {
    const id = this.id;
    const shaders = this.shaders;
    const texture = this.texture;
    if (IsDirty(id)) {
      Flush(renderPass);
      PopFramebuffer();
      ClearDirty(id);
      ClearDirtyChildCache(id);
      SetDirtyParents(id);
      SetInversedQuadFromCamera(id, renderPass.current2DCamera, this.x, this.y, texture.width, texture.height);
    }
    if (shaders.length === 0) {
      BatchTexturedQuadBuffer(texture, id, renderPass);
    } else {
      const x = this.x;
      const y = this.y;
      let prevTexture = texture;
      for (let i = 0; i < shaders.length; i++) {
        const shader = shaders[i];
        DrawTexturedQuadFlipped(renderPass, prevTexture, x, y, shader);
        prevTexture = shader.texture;
      }
      DrawTexturedQuadFlipped(renderPass, prevTexture, x, y);
    }
  }
}
