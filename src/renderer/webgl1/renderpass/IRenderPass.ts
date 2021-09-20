import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IShader } from '../shaders/IShader';
import { IStaticCamera } from '../../../camera/IStaticCamera';
import { IWebGLRenderer } from '../IWebGLRenderer';
import { TextureStack } from './TextureStack';

export interface IRenderPass
{
    renderer: IWebGLRenderer;
    projectionMatrix: Float32Array;
    cameraMatrix: Float32Array;

    count: number;
    prevCount: number;
    flushTotal: number;

    textures: TextureStack;

    quadShader: IShader;
    quadCamera: IStaticCamera;

    current2DCamera: IBaseCamera;

    reset (): void;
    flush (): void;
    resize (width: number, height: number): void;
    isCameraDirty (): boolean;
}
