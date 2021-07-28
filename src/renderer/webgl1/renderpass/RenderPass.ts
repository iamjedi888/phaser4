import { DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET } from '../../../colormatrix/const';

import { BlendModeStack } from './BlendModeStack';
import { ColorMatrixStack } from './ColorMatrixStack';
import { FramebufferStack } from './FramebufferStack';
import { GetBatchSize } from '../../../config/batchsize/GetBatchSize';
import { GetMaxTextures } from '../../../config/maxtextures/GetMaxTextures';
import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IRenderPass } from './IRenderPass';
import { IShader } from '../shaders/IShader';
import { IStaticCamera } from '../../../camera/IStaticCamera';
import { IVertexBuffer } from '../buffers/IVertexBuffer';
import { IWebGLRenderer } from '../IWebGLRenderer';
import { IndexedVertexBuffer } from '../buffers/IndexedVertexBuffer';
import { Mat4Ortho } from '../../../math/mat4/Mat4Ortho';
import { Matrix4 } from '../../../math/mat4/Matrix4';
import { MultiTextureQuadShader } from '../shaders/MultiTextureQuadShader';
import { QuadShader } from '../shaders/QuadShader';
import { ShaderStack } from './ShaderStack';
import { StaticCamera } from '../../../camera/StaticCamera';
import { TextureStack } from './TextureStack';
import { VertexBuffer } from '../buffers/VertexBuffer';
import { VertexBufferStack } from './VertexBufferStack';
import { ViewportStack } from './ViewportStack';

export class RenderPass implements IRenderPass
{
    renderer: IWebGLRenderer;

    projectionMatrix: Matrix4;
    cameraMatrix: Matrix4;

    count: number = 0;
    prevCount: number = 0;
    flushTotal: number = 0;

    //  Stacks
    framebuffer: FramebufferStack;
    vertexbuffer: VertexBufferStack;
    blendMode: BlendModeStack;
    shader: ShaderStack;
    viewport: ViewportStack;
    textures: TextureStack;
    colorMatrix: ColorMatrixStack;

    //  Single Texture Quad Shader + Camera
    quadShader: IShader;
    quadBuffer: IVertexBuffer;
    quadCamera: IStaticCamera;

    //  Current 2D Camera
    current2DCamera: IBaseCamera;

    constructor (renderer: IWebGLRenderer)
    {
        this.renderer = renderer;

        this.projectionMatrix = new Matrix4();

        this.framebuffer = new FramebufferStack(this);
        this.vertexbuffer = new VertexBufferStack(this);
        this.blendMode = new BlendModeStack(this);
        this.shader = new ShaderStack(this);
        this.viewport = new ViewportStack(this);
        this.textures = new TextureStack(this);
        this.colorMatrix = new ColorMatrixStack(this);

        this.reset();
    }

    getCurrentShader (): IShader
    {
        return this.shader.current.shader;
    }

    flush (): void
    {
        this.prevCount = this.count;

        this.count = 0;

        this.flushTotal++;
    }

    //  TODO - Call when context is lost and restored
    //  TODO - If already created, delete shaders / buffers first (i.e. during context loss)
    reset (): void
    {
        const gl = this.renderer.gl;

        //  Default QuadShader (for FBO drawing)

        this.quadShader = new QuadShader();
        this.quadBuffer = new IndexedVertexBuffer({ name: 'quad', isDynamic: false, indexLayout: [ 0, 1, 2, 2, 3, 0 ] });
        this.quadCamera = new StaticCamera(this.renderer.width, this.renderer.height);

        //  Default settings

        this.textures.setDefault();
        this.framebuffer.setDefault();
        this.blendMode.setDefault(true, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        this.colorMatrix.setDefault(DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET);
        this.vertexbuffer.setDefault(new VertexBuffer({ batchSize: GetBatchSize() }));
        this.shader.setDefault((GetMaxTextures() === 1) ? new QuadShader() : new MultiTextureQuadShader());
    }

    resize (width: number, height: number): void
    {
        //  TODO - -1 to 1?
        Mat4Ortho(0, width, height, 0, -1000, 1000, this.projectionMatrix);

        this.quadCamera.reset(width, height);

        this.viewport.setDefault(0, 0, width, height);
    }
}
