import { IRenderPass } from '../renderpass/IRenderPass';
import { IShaderConfig } from './IShaderConfig';
import { Shader } from './Shader';
export declare class TextureShader extends Shader {
    cameraMatrix: Float32Array;
    projectionMatrix: Float32Array;
    constructor(config?: IShaderConfig);
    bind(renderPass: IRenderPass): boolean;
}
//# sourceMappingURL=TextureShader.d.ts.map