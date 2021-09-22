import { BindShader } from "./BindShader";
import { MULTI_QUAD_FRAG } from "../glsl/MULTI_QUAD_FRAG";
import { Shader } from "./Shader";
import { TextureStack } from "../renderpass/TextureStack";
export class MultiTextureQuadShader extends Shader {
  constructor(config = {}) {
    config.fragmentShader = (config == null ? void 0 : config.fragmentShader) || MULTI_QUAD_FRAG;
    super(config);
  }
  bind(renderPass) {
    this.uniforms.set("uTexture", TextureStack.textureIndex);
    return BindShader(this, renderPass);
  }
}
