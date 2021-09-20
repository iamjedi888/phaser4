import { BlendModeStack } from './BlendModeStack';
import { ColorMatrixStack } from './ColorMatrixStack';
import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IShader } from '../shaders/IShader';
import { IStaticCamera } from '../../../camera/IStaticCamera';
import { IWebGLRenderer } from '../IWebGLRenderer';
import { ShaderStack } from './ShaderStack';
import { TextureStack } from './TextureStack';
import { VertexBufferStack } from './VertexBufferStack';
import { ViewportStack } from './ViewportStack';

export interface IRenderPass
{
    renderer: IWebGLRenderer;
    projectionMatrix: Float32Array;
    cameraMatrix: Float32Array;

    count: number;
    prevCount: number;
    flushTotal: number;

    vertexbuffer: VertexBufferStack;
    shader: ShaderStack;
    viewport: ViewportStack;
    textures: TextureStack;
    colorMatrix: ColorMatrixStack;

    quadShader: IShader;
    quadCamera: IStaticCamera;

    current2DCamera: IBaseCamera;

    reset (): void;
    flush (): void;
    getCurrentShader (): IShader;
    resize (width: number, height: number): void;
    isCameraDirty (): boolean;
}
