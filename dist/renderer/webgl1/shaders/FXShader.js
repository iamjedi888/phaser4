var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BindShader } from "./BindShader";
import { DefaultQuadAttributes } from "./DefaultQuadAttributes";
import { Shader } from "./Shader";
export class FXShader extends Shader {
  constructor(config = {}) {
    config.attributes = (config == null ? void 0 : config.attributes) || DefaultQuadAttributes;
    config.renderToFramebuffer = true;
    super(config);
    __publicField(this, "timeVar");
    __publicField(this, "resolutionVar");
    __publicField(this, "timeScale");
    const {
      timeUniform = "uTime",
      resolutionUniform = "uResolution",
      timeScale = 1e-3
    } = config;
    const uniforms = [...this.uniformSetters.keys()];
    this.timeVar = uniforms.includes(timeUniform) ? timeUniform : "time";
    this.resolutionVar = uniforms.includes(resolutionUniform) ? resolutionUniform : "resolution";
    if (!uniforms.includes(this.timeVar)) {
      this.timeVar = void 0;
    }
    if (!uniforms.includes(this.resolutionVar)) {
      this.resolutionVar = void 0;
    }
    this.timeScale = timeScale;
  }
  bind(renderPass) {
    const timeVar = this.timeVar;
    const resolutionVar = this.resolutionVar;
    if (timeVar) {
      this.uniforms.set(timeVar, performance.now() * this.timeScale);
    }
    if (resolutionVar) {
      const renderer = renderPass.renderer;
      this.uniforms.set(resolutionVar, [renderer.width, renderer.height]);
    }
    return BindShader(this, renderPass);
  }
}
