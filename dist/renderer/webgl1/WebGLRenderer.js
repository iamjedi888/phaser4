var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GetHeight, GetResolution, GetWidth } from "../../config/size/";
import { End } from "./renderpass/End";
import { GL } from "./GL";
import { GetBackgroundColor } from "../../config/backgroundcolor/GetBackgroundColor";
import { GetRGBArray } from "./colors/GetRGBArray";
import { GetWebGLContext } from "../../config/webglcontext/GetWebGLContext";
import { ProcessBindingQueue } from "./renderpass/ProcessBindingQueue";
import { RenderPass } from "./renderpass/RenderPass";
import { Start } from "./renderpass";
import { WebGLRendererInstance } from "./WebGLRendererInstance";
import { WorldList } from "../../world/WorldList";
export class WebGLRenderer {
  constructor() {
    __publicField(this, "canvas");
    __publicField(this, "gl");
    __publicField(this, "renderPass");
    __publicField(this, "clearColor", [0, 0, 0, 1]);
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "resolution");
    __publicField(this, "clearBeforeRender", true);
    __publicField(this, "optimizeRedraw", true);
    __publicField(this, "autoResize", true);
    __publicField(this, "contextLost", false);
    this.width = GetWidth();
    this.height = GetHeight();
    this.resolution = GetResolution();
    this.setBackgroundColor(GetBackgroundColor());
    const canvas = document.createElement("canvas");
    canvas.addEventListener("webglcontextlost", (event) => this.onContextLost(event), false);
    canvas.addEventListener("webglcontextrestored", () => this.onContextRestored(), false);
    this.canvas = canvas;
    this.initContext();
    WebGLRendererInstance.set(this);
    this.renderPass = new RenderPass(this);
    this.resize(this.width, this.height, this.resolution);
  }
  initContext() {
    const gl = this.canvas.getContext("webgl", GetWebGLContext());
    GL.set(gl);
    this.gl = gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
  }
  resize(width, height, resolution = 1) {
    const calcWidth = width * resolution;
    const calcHeight = height * resolution;
    this.width = calcWidth;
    this.height = calcHeight;
    this.resolution = resolution;
    const canvas = this.canvas;
    canvas.width = calcWidth;
    canvas.height = calcHeight;
    if (this.autoResize) {
      canvas.style.width = width.toString() + "px";
      canvas.style.height = height.toString() + "px";
    }
    this.renderPass.resize(calcWidth, calcHeight);
  }
  onContextLost(event) {
    event.preventDefault();
    this.contextLost = true;
  }
  onContextRestored() {
    this.contextLost = false;
    this.initContext();
  }
  setBackgroundColor(color) {
    GetRGBArray(color, this.clearColor);
    return this;
  }
  reset() {
  }
  render(willRedraw, scenes) {
    if (this.contextLost) {
      return;
    }
    const gl = this.gl;
    const renderPass = this.renderPass;
    gl.getContextAttributes();
    ProcessBindingQueue();
    if (this.optimizeRedraw && !willRedraw) {
    }
    if (this.clearBeforeRender) {
      const cls = this.clearColor;
      gl.clearColor(cls[0], cls[1], cls[2], cls[3]);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    Start(renderPass);
    for (const scene of scenes.values()) {
      const worlds = WorldList.get(scene);
      for (const world of worlds) {
        if (world.runRender) {
          world.renderGL(renderPass);
          world.postRenderGL(renderPass);
        }
      }
    }
    End(renderPass);
  }
  destroy() {
    WebGLRendererInstance.set(void 0);
  }
}
