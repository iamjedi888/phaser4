import {DefaultQuadAttributes} from "./DefaultQuadAttributes";
import {Shader} from "./Shader";
export class QuadShader extends Shader {
  constructor(config = {}) {
    const shaderConfig = config;
    shaderConfig.attributes = !shaderConfig.attributes ? DefaultQuadAttributes : shaderConfig.attributes;
    super(shaderConfig);
  }
  bind(renderPass) {
    const uniforms = this.uniforms;
    uniforms.set("uProjectionMatrix", renderPass.projectionMatrix.data);
    uniforms.set("uCameraMatrix", renderPass.cameraMatrix.data);
    return super.bind(renderPass);
  }
}
