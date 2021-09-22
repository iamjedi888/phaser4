var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { FlipFrameUVs } from "../../../textures/FlipFrameUVs";
import { Mat4Ortho } from "../../../math/mat4/Mat4Ortho";
import { SetUniforms } from "./SetUniforms";
import { Shader } from "./Shader";
export class TextureShader extends Shader {
  constructor(config = {}) {
    config.renderToFramebuffer = true;
    super(config);
    __publicField(this, "cameraMatrix");
    __publicField(this, "projectionMatrix");
    this.cameraMatrix = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    this.projectionMatrix = new Float32Array(16);
    Mat4Ortho(this.projectionMatrix, 0, this.viewport.width, this.viewport.height, 0, -1, 1);
    FlipFrameUVs(this.texture.firstFrame);
  }
  bind(renderPass) {
    const uniforms = this.uniforms;
    uniforms.set("uProjectionMatrix", this.projectionMatrix);
    uniforms.set("uCameraMatrix", this.cameraMatrix);
    this.updateUniforms(renderPass);
    return SetUniforms(this, renderPass);
  }
}
