import {Flush, PopFramebuffer, SetFramebuffer} from "../../renderer/webgl1/renderpass";
import {GetHeight, GetResolution, GetWidth} from "../../config/size";
import {CreateFramebuffer} from "../../renderer/webgl1/fbo/CreateFramebuffer";
import {DIRTY_CONST} from "../DIRTY_CONST";
import {DrawTexturedQuad} from "../../renderer/webgl1/draw/DrawTexturedQuad";
import {GLTextureBinding} from "../../renderer/webgl1/textures/GLTextureBinding";
import {Layer} from "../layer/Layer";
import {Texture} from "../../textures/Texture";
export class RenderLayer extends Layer {
  constructor() {
    super();
    this.type = "RenderLayer";
    this.willRender = true;
    this.willRenderChildren = true;
    this.willCacheChildren = true;
    this.setDirty(DIRTY_CONST.CHILD_CACHE);
    const width = GetWidth();
    const height = GetHeight();
    const resolution = GetResolution();
    const texture = new Texture(null, width * resolution, height * resolution);
    const binding = new GLTextureBinding(texture);
    texture.binding = binding;
    binding.framebuffer = CreateFramebuffer(binding.texture);
    this.texture = texture;
    this.framebuffer = binding.framebuffer;
  }
  renderGL(renderPass) {
    if (this.numChildren > 0) {
      Flush(renderPass);
      if (!this.willCacheChildren || this.isDirty(DIRTY_CONST.CHILD_CACHE)) {
        SetFramebuffer(renderPass, this.framebuffer, true);
        this.clearDirty(DIRTY_CONST.CHILD_CACHE);
      } else {
        SetFramebuffer(renderPass, this.framebuffer, false);
        this.postRenderGL(renderPass);
      }
    }
  }
  postRenderGL(renderPass) {
    Flush(renderPass);
    PopFramebuffer(renderPass);
    DrawTexturedQuad(renderPass, this.texture);
    this.clearDirty(DIRTY_CONST.TRANSFORM);
  }
}
