var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET } from "../../../colormatrix/const";
import { BlendModeStack } from "./BlendModeStack";
import { ColorMatrixStack } from "./ColorMatrixStack";
import { FramebufferStack } from "./FramebufferStack";
import { GetBatchSize } from "../../../config/batchsize/GetBatchSize";
import { GetMaxTextures } from "../../../config/maxtextures/GetMaxTextures";
import { Mat4Ortho } from "../../../math/mat4/Mat4Ortho";
import { MultiTextureQuadShader } from "../shaders/MultiTextureQuadShader";
import { SetDefaultBlendMode } from "./SetDefaultBlendMode";
import { SetDefaultColorMatrix } from "./SetDefaultColorMatrix";
import { SetDefaultFramebuffer } from "./index";
import { SetDefaultShader } from "./SetDefaultShader";
import { SetDefaultTextures } from "./SetDefaultTextures";
import { SetDefaultVertexBuffer } from "./SetDefaultVertexBuffer";
import { SetDefaultViewport } from "./SetDefaultViewport";
import { ShaderStack } from "./ShaderStack";
import { SingleTextureQuadShader } from "../shaders/SingleTextureQuadShader";
import { StaticCamera } from "../../../camera/StaticCamera";
import { TextureStack } from "./TextureStack";
import { VertexBuffer } from "../buffers/VertexBuffer";
import { VertexBufferStack } from "./VertexBufferStack";
import { ViewportStack } from "./ViewportStack";
export class RenderPass {
  constructor(renderer) {
    __publicField(this, "renderer");
    __publicField(this, "projectionMatrix");
    __publicField(this, "cameraMatrix");
    __publicField(this, "count", 0);
    __publicField(this, "prevCount", 0);
    __publicField(this, "flushTotal", 0);
    __publicField(this, "quadShader");
    __publicField(this, "quadCamera");
    __publicField(this, "current2DCamera");
    this.renderer = renderer;
    this.projectionMatrix = new Float32Array(16);
    FramebufferStack.init(this);
    BlendModeStack.init(this);
    VertexBufferStack.init(this);
    ViewportStack.init(this);
    ShaderStack.init(this);
    ColorMatrixStack.init(this);
    TextureStack.init(this);
    this.reset();
  }
  flush() {
    this.prevCount = this.count;
    this.count = 0;
    this.flushTotal++;
  }
  reset() {
    const gl = this.renderer.gl;
    this.quadShader = new SingleTextureQuadShader();
    this.quadCamera = new StaticCamera(this.renderer.width, this.renderer.height);
    SetDefaultTextures();
    SetDefaultFramebuffer();
    SetDefaultBlendMode(true, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    SetDefaultVertexBuffer(new VertexBuffer({ batchSize: GetBatchSize() }));
    SetDefaultShader(GetMaxTextures() === 1 ? new SingleTextureQuadShader() : new MultiTextureQuadShader());
    SetDefaultColorMatrix(DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET);
  }
  resize(width, height) {
    Mat4Ortho(this.projectionMatrix, 0, width, height, 0, -1e3, 1e3);
    this.quadCamera.reset(width, height);
    SetDefaultViewport(0, 0, width, height);
  }
  isCameraDirty() {
    return this.current2DCamera.isDirty;
  }
}
