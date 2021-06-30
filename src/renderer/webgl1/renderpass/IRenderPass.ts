import { BlendModeStack } from './BlendModeStack';
import { FramebufferStack } from './FramebufferStack';
import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IShader } from '../shaders/IShader';
import { IVertexBuffer } from '../buffers/IVertexBuffer';
import { IWebGLRenderer } from '../IWebGLRenderer';
import { Matrix4 } from '../../../math/mat4/Matrix4';
import { ShaderStack } from './ShaderStack';
import { SingleTextureStack } from './SingleTextureStack';
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

    framebuffer: FramebufferStack;
    vertexbuffer: VertexBufferStack;
    blendMode: BlendModeStack;
    shader: ShaderStack;
    viewport: ViewportStack;
    textures: SingleTextureStack;

    quadShader: IShader;
    quadBuffer: IVertexBuffer;
    quadCamera: IBaseCamera;

    current2DCamera: IBaseCamera;

    reset (): void;
    flush (): void;
    resize (width: number, height: number): void;
}
