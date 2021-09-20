import { BindShader } from './BindShader';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShaderConfig } from './IShaderConfig';
import { MULTI_QUAD_FRAG } from '../glsl/MULTI_QUAD_FRAG';
import { Shader } from './Shader';
import { TextureStack } from '../renderpass/TextureStack';

export class MultiTextureQuadShader extends Shader
{
    constructor (config: IShaderConfig = {})
    {
        config.fragmentShader = config?.fragmentShader || MULTI_QUAD_FRAG;

        super(config);
    }

    bind (renderPass: IRenderPass): boolean
    {
        this.uniforms.set('uTexture', TextureStack.textureIndex);

        return BindShader(this, renderPass);
    }
}
