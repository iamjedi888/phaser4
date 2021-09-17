import { IShaderConfig } from './IShaderConfig';
import { SINGLE_QUAD_FRAG } from '../glsl/SINGLE_QUAD_FRAG';
import { Shader } from './Shader';

export class SingleTextureQuadShader extends Shader
{
    constructor (config: IShaderConfig = {})
    {
        config.fragmentShader = config?.fragmentShader || SINGLE_QUAD_FRAG;

        super(config);
    }
}
