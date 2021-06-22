import { GetMaxTextures } from '../../../config/maxtextures/GetMaxTextures';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShaderConfig } from './IShaderConfig';
import { MULTI_QUAD_FRAG } from '../glsl/MULTI_QUAD_FRAG';
import { QuadShader } from './QuadShader';

export class MultiTextureQuadShader extends QuadShader
{
    constructor (config: IShaderConfig = {})
    {
        if (!config.fragmentShader)
        {
            config.fragmentShader = MULTI_QUAD_FRAG;
        }

        super(config);
    }

    create (fragmentShaderSource: string, vertexShaderSource: string, uniforms: {}, attribs: {}): void
    {
        const maxTextures = GetMaxTextures();

        let src = '';

        for (let i = 1; i < maxTextures; i++)
        {
            if (i > 1)
            {
                src += '\n\telse ';
            }

            if (i < maxTextures - 1)
            {
                src += `if (vTextureId < ${i}.5)`;
            }

            src += '\n\t{';
            src += `\n\t\tcolor = texture2D(uTexture[${i}], vTextureCoord);`;
            src += '\n\t}';
        }

        fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);
        fragmentShaderSource = fragmentShaderSource.replace(/%forloop%/gi, src);

        super.create(fragmentShaderSource, vertexShaderSource, uniforms, attribs);
    }

    bind (renderPass: IRenderPass): boolean
    {
        this.uniforms.set('uTexture', renderPass.textures.textureIndex);

        return super.bind(renderPass);
    }
}
