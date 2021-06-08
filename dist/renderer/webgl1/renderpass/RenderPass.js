var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { CreateTempTextures } from "./CreateTempTextures";
import { GetBatchSize } from "../../../config/batchsize/GetBatchSize";
import { IndexedVertexBuffer } from "../buffers/IndexedVertexBuffer";
import { Mat4Ortho } from "../../../math/mat4/Mat4Ortho";
import { Matrix4 } from "../../../math/mat4/Matrix4";
import { MultiTextureQuadShader } from "../shaders";
import { QuadShader } from "../shaders/QuadShader";
import { SetDefaultBlendMode } from "./SetDefaultBlendMode";
import { SetDefaultFramebuffer } from "./SetDefaultFramebuffer";
import { SetDefaultShader } from "./SetDefaultShader";
import { SetDefaultVertexBuffer } from "./SetDefaultVertexBuffer";
import { SetDefaultViewport } from "./SetDefaultViewport";
import { StaticCamera } from "../../../camera";
export class RenderPass {
  constructor(renderer) {
    __publicField(this, "renderer");
    __publicField(this, "projectionMatrix");
    __publicField(this, "cameraMatrix");
    __publicField(this, "count", 0);
    __publicField(this, "prevCount", 0);
    __publicField(this, "flushTotal", 0);
    __publicField(this, "maxTextures", 0);
    __publicField(this, "currentActiveTexture", 0);
    __publicField(this, "startActiveTexture", 0);
    __publicField(this, "tempTextures", []);
    __publicField(this, "textureIndex", []);
    __publicField(this, "framebufferStack", []);
    __publicField(this, "currentFramebuffer", null);
    __publicField(this, "defaultFramebuffer", null);
    __publicField(this, "vertexBufferStack", []);
    __publicField(this, "currentVertexBuffer", null);
    __publicField(this, "defaultVertexBuffer", null);
    __publicField(this, "shaderStack", []);
    __publicField(this, "currentShader", null);
    __publicField(this, "defaultShader", null);
    __publicField(this, "viewportStack", []);
    __publicField(this, "currentViewport", null);
    __publicField(this, "defaultViewport", null);
    __publicField(this, "blendModeStack", []);
    __publicField(this, "currentBlendMode", null);
    __publicField(this, "defaultBlendMode", null);
    __publicField(this, "quadShader");
    __publicField(this, "quadBuffer");
    __publicField(this, "quadCamera");
    __publicField(this, "current2DCamera");
    this.renderer = renderer;
    this.projectionMatrix = new Matrix4();
    this.reset();
  }
  reset() {
    const gl = this.renderer.gl;
    const indexLayout = [0, 1, 2, 2, 3, 0];
    this.quadShader = new QuadShader();
    this.quadBuffer = new IndexedVertexBuffer({ isDynamic: false, indexLayout });
    this.quadCamera = new StaticCamera();
    CreateTempTextures(this);
    SetDefaultFramebuffer(this);
    SetDefaultBlendMode(this, true, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    SetDefaultVertexBuffer(this, new IndexedVertexBuffer({ batchSize: GetBatchSize(), indexLayout }));
    SetDefaultShader(this, new MultiTextureQuadShader());
  }
  resize(width, height) {
    Mat4Ortho(0, width, height, 0, -1e3, 1e3, this.projectionMatrix);
    this.quadCamera.reset();
    SetDefaultViewport(this, 0, 0, width, height);
  }
}
