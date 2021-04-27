import {CreateTempTextures} from "./CreateTempTextures";
import {GetBatchSize} from "../../../config/batchsize/GetBatchSize";
import {IndexedVertexBuffer} from "../buffers/IndexedVertexBuffer";
import {Mat4Ortho} from "../../../math/mat4/Mat4Ortho";
import {Matrix4} from "../../../math/mat4/Matrix4";
import {MultiTextureQuadShader} from "../shaders";
import {QuadShader} from "../shaders/QuadShader";
import {SetDefaultBlendMode} from "./SetDefaultBlendMode";
import {SetDefaultFramebuffer} from "./SetDefaultFramebuffer";
import {SetDefaultShader} from "./SetDefaultShader";
import {SetDefaultVertexBuffer} from "./SetDefaultVertexBuffer";
import {SetDefaultViewport} from "./SetDefaultViewport";
import {StaticCamera} from "../../../camera";
export class RenderPass {
  constructor(renderer) {
    this.count = 0;
    this.prevCount = 0;
    this.flushTotal = 0;
    this.maxTextures = 0;
    this.currentActiveTexture = 0;
    this.startActiveTexture = 0;
    this.tempTextures = [];
    this.textureIndex = [];
    this.framebufferStack = [];
    this.currentFramebuffer = null;
    this.defaultFramebuffer = null;
    this.vertexBufferStack = [];
    this.currentVertexBuffer = null;
    this.defaultVertexBuffer = null;
    this.shaderStack = [];
    this.currentShader = null;
    this.defaultShader = null;
    this.viewportStack = [];
    this.currentViewport = null;
    this.defaultViewport = null;
    this.blendModeStack = [];
    this.currentBlendMode = null;
    this.defaultBlendMode = null;
    this.renderer = renderer;
    this.projectionMatrix = new Matrix4();
    this.reset();
  }
  reset() {
    const gl = this.renderer.gl;
    const indexLayout = [0, 1, 2, 2, 3, 0];
    this.quadShader = new QuadShader();
    this.quadBuffer = new IndexedVertexBuffer({isDynamic: false, indexLayout});
    this.quadCamera = new StaticCamera();
    CreateTempTextures(this);
    SetDefaultFramebuffer(this);
    SetDefaultBlendMode(this, true, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    SetDefaultVertexBuffer(this, new IndexedVertexBuffer({batchSize: GetBatchSize(), indexLayout}));
    SetDefaultShader(this, new MultiTextureQuadShader());
  }
  resize(width, height) {
    Mat4Ortho(0, width, height, 0, -1e3, 1e3, this.projectionMatrix);
    this.quadCamera.reset();
    SetDefaultViewport(this, 0, 0, width, height);
  }
}
