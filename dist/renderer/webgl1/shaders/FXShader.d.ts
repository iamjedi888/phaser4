import { IFXShaderConfig } from './IFXShaderConfig';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { Shader } from './Shader';
export declare class FXShader extends Shader implements IShader {
    private timeVar;
    private resolutionVar;
    timeScale: number;
    constructor(config?: IFXShaderConfig);
    bind(renderPass: IRenderPass): boolean;
}
//# sourceMappingURL=FXShader.d.ts.map