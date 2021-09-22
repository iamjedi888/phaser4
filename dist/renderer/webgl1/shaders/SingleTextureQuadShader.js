import { SINGLE_QUAD_FRAG } from "../glsl/SINGLE_QUAD_FRAG";
import { Shader } from "./Shader";
export class SingleTextureQuadShader extends Shader {
  constructor(config = {}) {
    config.fragmentShader = (config == null ? void 0 : config.fragmentShader) || SINGLE_QUAD_FRAG;
    super(config);
  }
}
