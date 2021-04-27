import {DefaultQuadAttributes} from "./DefaultQuadAttributes";
import {QuadShader} from "./QuadShader";
export class FXShader extends QuadShader {
  constructor(config = {}) {
    const shaderConfig = config;
    shaderConfig.attributes = !shaderConfig.attributes ? DefaultQuadAttributes : shaderConfig.attributes;
    shaderConfig.renderToFramebuffer = true;
    super(shaderConfig);
  }
  bind(renderPass) {
    const renderer = renderPass.renderer;
    this.uniforms.set("uTime", performance.now());
    this.uniforms.set("uResolution", [renderer.width, renderer.height]);
    return super.bind(renderPass);
  }
}
