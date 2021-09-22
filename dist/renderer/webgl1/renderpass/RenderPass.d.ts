import { IBaseCamera } from '../../../camera/IBaseCamera';
import { IRenderPass } from './IRenderPass';
import { IShader } from '../shaders/IShader';
import { IWebGLRenderer } from '../IWebGLRenderer';
export declare class RenderPass implements IRenderPass {
    renderer: IWebGLRenderer;
    projectionMatrix: Float32Array;
    cameraMatrix: Float32Array;
    count: number;
    prevCount: number;
    flushTotal: number;
    quadShader: IShader;
    quadCamera: IBaseCamera;
    current2DCamera: IBaseCamera;
    constructor(renderer: IWebGLRenderer);
    flush(): void;
    reset(): void;
    resize(width: number, height: number): void;
    isCameraDirty(): boolean;
}
//# sourceMappingURL=RenderPass.d.ts.map