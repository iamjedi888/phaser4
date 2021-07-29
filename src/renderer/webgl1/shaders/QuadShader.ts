import { DefaultQuadAttributes } from './DefaultQuadAttributes';
import { IShader } from './IShader';
import { IShaderConfig } from './IShaderConfig';
import { Shader } from './Shader';

//  Do we even need this class? As Shader defaults to this anyway :)

export class QuadShader extends Shader implements IShader
{
    constructor (config: IShaderConfig = {})
    {
        config.attributes = config?.attributes || DefaultQuadAttributes;

        super(config);
    }
}
