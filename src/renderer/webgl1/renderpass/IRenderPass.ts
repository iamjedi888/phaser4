import { BlendModeStack } from './BlendModeStack';
import { FramebufferStack } from './FramebufferStack';
import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IShader } from '../shaders/IShader';
import { IVertexBuffer } from '../buffers/IVertexBuffer';
import { IWebGLRenderer } from '../IWebGLRenderer';
import { Matrix4 } from '../../../math/mat4/Matrix4';
import { ShaderStack } from './ShaderStack';
import { VertexBufferStack } from './VertexBufferStack';
import { ViewportStack } from './ViewportStack';

export interface IRenderPass
{
    renderer: IWebGLRenderer;
    projectionMatrix: Matrix4;
    cameraMatrix: Matrix4;

    count: number;
    prevCount: number;
    flushTotal: number;

    //  The maximum number of combined image units the GPU supports
    //  According to the WebGL spec the minimum is 8
    maxTextures: number;
    currentActiveTexture: number;
    startActiveTexture: number;
    tempTextures: WebGLTexture[];
    textureIndex: number[];

    framebuffer: FramebufferStack;
    vertexbuffer: VertexBufferStack;
    blendMode: BlendModeStack;
    shader: ShaderStack;
    viewport: ViewportStack;

    quadShader: IShader;
    quadBuffer: IVertexBuffer;
    quadCamera: IBaseCamera;

    current2DCamera: IBaseCamera;

    reset (): void;
    resize (width: number, height: number): void;
}
