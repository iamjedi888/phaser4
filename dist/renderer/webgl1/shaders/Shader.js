var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BindShader } from "./BindShader";
import { SetShaderFromConfig } from "./SetShaderFromConfig";
export class Shader {
  constructor(config) {
    __publicField(this, "program");
    __publicField(this, "attributes");
    __publicField(this, "uniforms");
    __publicField(this, "uniformSetters");
    __publicField(this, "texture");
    __publicField(this, "framebuffer");
    __publicField(this, "renderToFramebuffer", false);
    __publicField(this, "renderToDepthbuffer", false);
    __publicField(this, "isActive", false);
    __publicField(this, "viewport");
    if (config) {
      SetShaderFromConfig(this, config);
    }
  }
  updateUniforms(renderPass) {
  }
  bind(renderPass) {
    return BindShader(this, renderPass);
  }
}
