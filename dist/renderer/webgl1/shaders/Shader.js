var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GetHeight, GetResolution, GetWidth } from "../../../config/size/";
import { CreateAttributes } from "./CreateAttributes";
import { CreateDepthBuffer } from "../fbo/CreateDepthBuffer";
import { CreateFramebuffer } from "../fbo/CreateFramebuffer";
import { CreateProgram } from "./CreateProgram";
import { CreateShader } from "./CreateShader";
import { CreateUniforms } from "./CreateUniforms";
import { DefaultQuadAttributes } from "./DefaultQuadAttributes";
import { DefaultQuadUniforms } from "./DefaultQuadUniforms";
import { DeleteFramebuffer } from "../fbo/DeleteFramebuffer";
import { DeleteGLTexture } from "../textures/DeleteGLTexture";
import { DeleteShaders } from "./DeleteShaders";
import { GLTextureBinding } from "../textures/GLTextureBinding";
import { SINGLE_QUAD_FRAG } from "../glsl/SINGLE_QUAD_FRAG";
import { SINGLE_QUAD_VERT } from "../glsl/SINGLE_QUAD_VERT";
import { Texture } from "../../../textures/Texture";
import { gl } from "../GL";
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
    if (config) {
      this.fromConfig(config);
    }
  }
  fromConfig(config) {
    const {
      attributes = DefaultQuadAttributes,
      fragmentShader = SINGLE_QUAD_FRAG,
      height = GetHeight(),
      renderToFramebuffer = false,
      renderToDepthbuffer = false,
      resolution = GetResolution(),
      vertexShader = SINGLE_QUAD_VERT,
      width = GetWidth(),
      uniforms = DefaultQuadUniforms
    } = config;
    this.create(fragmentShader, vertexShader, uniforms, attributes);
    if (renderToFramebuffer) {
      this.renderToFramebuffer = true;
      const texture = new Texture(null, width * resolution, height * resolution);
      const binding = new GLTextureBinding(texture);
      texture.binding = binding;
      binding.framebuffer = CreateFramebuffer(binding.texture);
      if (renderToDepthbuffer) {
        this.renderToDepthbuffer = true;
        binding.depthbuffer = CreateDepthBuffer(binding.framebuffer, texture.width, texture.height);
      }
      this.texture = texture;
      this.framebuffer = binding.framebuffer;
    }
  }
  create(fragmentShaderSource, vertexShaderSource, uniforms, attribs) {
    const fragmentShader = CreateShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    const vertexShader = CreateShader(vertexShaderSource, gl.VERTEX_SHADER);
    if (!fragmentShader || !vertexShader) {
      return;
    }
    const program = CreateProgram(fragmentShader, vertexShader);
    if (!program) {
      return;
    }
    const currentProgram = gl.getParameter(gl.CURRENT_PROGRAM);
    gl.useProgram(program);
    this.program = program;
    this.uniformSetters = CreateUniforms(program);
    this.uniforms = new Map();
    for (const [key, value] of Object.entries(uniforms)) {
      this.uniforms.set(key, value);
    }
    this.attributes = CreateAttributes(program, attribs);
    gl.useProgram(currentProgram);
    this.isActive = false;
  }
  updateUniforms(renderPass) {
  }
  bind(renderPass) {
    const uniforms = this.uniforms;
    uniforms.set("uProjectionMatrix", renderPass.projectionMatrix.data);
    uniforms.set("uCameraMatrix", renderPass.cameraMatrix.data);
    this.updateUniforms(renderPass);
    return this.setUniforms(renderPass);
  }
  setUniform(key, value) {
    const uniforms = this.uniforms;
    if (uniforms.has(key)) {
      uniforms.set(key, value);
      const setter = this.uniformSetters.get(key);
      setter(value);
    }
  }
  setUniforms(renderPass) {
    if (!this.program) {
      return false;
    }
    gl.useProgram(this.program);
    this.isActive = true;
    const uniforms = this.uniforms;
    for (const [name, setter] of this.uniformSetters.entries()) {
      setter(uniforms.get(name));
    }
    return true;
  }
  setAttributes(renderPass) {
    if (this.program) {
      const stride = renderPass.currentVertexBuffer.vertexByteSize;
      this.attributes.forEach((attrib) => {
        gl.vertexAttribPointer(attrib.index, attrib.size, attrib.type, attrib.normalized, stride, attrib.offset);
      });
    }
  }
  destroy() {
    DeleteShaders(this.program);
    DeleteGLTexture(this.texture);
    DeleteFramebuffer(this.framebuffer);
    this.uniforms.clear();
    this.uniformSetters.clear();
    this.attributes.clear();
    this.program = null;
    this.texture = null;
    this.framebuffer = null;
  }
}
