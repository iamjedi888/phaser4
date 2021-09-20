import { DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET } from '../../../colormatrix/const';

import { BlendModeStack } from './BlendModeStack';
import { ColorMatrixStack } from './ColorMatrixStack';
import { FramebufferStack } from './FramebufferStack';
import { GetBatchSize } from '../../../config/batchsize/GetBatchSize';
import { GetMaxTextures } from '../../../config/maxtextures/GetMaxTextures';
import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IRenderPass } from './IRenderPass';
import { IShader } from '../shaders/IShader';
import { IWebGLRenderer } from '../IWebGLRenderer';
import { Mat4Ortho } from '../../../math/mat4/Mat4Ortho';
import { MultiTextureQuadShader } from '../shaders/MultiTextureQuadShader';
import { SetDefaultFramebuffer } from './index';
import { ShaderStack } from './ShaderStack';
import { SingleTextureQuadShader } from '../shaders/SingleTextureQuadShader';
import { StaticCamera } from '../../../camera/StaticCamera';
import { TextureStack } from './TextureStack';
import { VertexBuffer } from '../buffers/VertexBuffer';
import { VertexBufferStack } from './VertexBufferStack';
import { ViewportStack } from './ViewportStack';

export class RenderPass implements IRenderPass
{
    renderer: IWebGLRenderer;

    projectionMatrix: Float32Array;
    cameraMatrix: Float32Array;

    count: number = 0;
    prevCount: number = 0;
    flushTotal: number = 0;

    //  Stacks
    // framebuffer: IFramebufferStack;
    vertexbuffer: VertexBufferStack;
    blendMode: BlendModeStack;
    shader: ShaderStack;
    viewport: ViewportStack;
    textures: TextureStack;
    colorMatrix: ColorMatrixStack;

    //  Single Texture Quad Shader + Camera
    quadShader: IShader;
    quadCamera: IBaseCamera;

    //  Current 2D Camera
    current2DCamera: IBaseCamera;

    constructor (renderer: IWebGLRenderer)
    {
        this.renderer = renderer;

        this.projectionMatrix = new Float32Array(16);

        FramebufferStack.init(this);

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

        this.quadShader = new SingleTextureQuadShader();
        this.quadCamera = new StaticCamera(this.renderer.width, this.renderer.height);

        //  Default settings

        this.textures.setDefault();

        SetDefaultFramebuffer();
        // this.framebuffer.setDefault();

        this.blendMode.setDefault(true, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        this.colorMatrix.setDefault(DEFAULT_COLOR_MATRIX, DEFAULT_COLOR_OFFSET);
        this.vertexbuffer.setDefault(new VertexBuffer({ batchSize: GetBatchSize() }));
        this.shader.setDefault((GetMaxTextures() === 1) ? new SingleTextureQuadShader() : new MultiTextureQuadShader());
    }

    resize (width: number, height: number): void
    {
        //  TODO - -1 to 1?
        Mat4Ortho(this.projectionMatrix, 0, width, height, 0, -1000, 1000);

        this.quadCamera.reset(width, height);

        this.viewport.setDefault(0, 0, width, height);
    }

    isCameraDirty (): boolean
    {
        return this.current2DCamera.isDirty;
    }
}
