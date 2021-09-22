import { IRenderPass } from '../renderpass/IRenderPass';
import { IShaderConfig } from './IShaderConfig';
import { Shader } from './Shader';
export declare class MultiTextureQuadShader extends Shader {
    constructor(config?: IShaderConfig);
    bind(renderPass: IRenderPass): boolean;
}
//# sourceMappingURL=MultiTextureQuadShader.d.ts.map