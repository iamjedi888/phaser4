import {GetMaxTextures} from "../../../config/maxtextures/GetMaxTextures";
import {MULTI_QUAD_FRAG} from "../glsl/MULTI_QUAD_FRAG";
import {QuadShader} from "./QuadShader";
export class MultiTextureQuadShader extends QuadShader {
  constructor(config = {}) {
    if (!config.fragmentShader) {
      config.fragmentShader = MULTI_QUAD_FRAG;
    }
    super(config);
  }
  create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
    const maxTextures = GetMaxTextures();
    let src = "";
    for (let i = 1; i < maxTextures; i++) {
      if (i > 1) {
        src += "\n	else ";
      }
      if (i < maxTextures - 1) {
        src += `if (vTextureId < ${i}.5)`;
      }
      src += "\n	{";
      src += `
		color = texture2D(uTexture[${i}], vTextureCoord);`;
      src += "\n	}";
    }
    fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
    fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);
    super.create(fragmentShaderSource, vertexShaderSource, uniforms, attribs);
  }
  bind(renderPass) {
    this.uniforms.set("uTexture", renderPass.textureIndex);
    return super.bind(renderPass);
  }
}
