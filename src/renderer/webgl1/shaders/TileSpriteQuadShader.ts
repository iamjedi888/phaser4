import { BindShader } from './BindShader';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShaderConfig } from './IShaderConfig';
import { Shader } from './Shader';
import { TILESPRITE_FRAG } from '../glsl/TILESPRITE_FRAG';
import { TextureStack } from '../renderpass/TextureStack';

export class TileSpriteQuadShader extends Shader
{
    constructor (config: IShaderConfig = {})
    {
        config.fragmentShader = config?.fragmentShader || TILESPRITE_FRAG;

        super(config);
    }

    bind (renderPass: IRenderPass): boolean
    {
        this.uniforms.set('uTexture', TextureStack.textureIndex);
        this.uniforms.set('uTime', performance.now() / 1000);

        return BindShader(this, renderPass);
    }
}
