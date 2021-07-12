import { Color } from '../../../components/color/Color';
import { Flush } from '../renderpass';
import { GetMaxTextures } from '../../../config/maxtextures/GetMaxTextures';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShaderConfig } from './IShaderConfig';
import { MULTI_QUAD_FRAG } from '../glsl/MULTI_QUAD_FRAG';
import { QuadShader } from './QuadShader';

export class MultiTextureQuadShader extends QuadShader
{
    private defaultColorMatrix = new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    private defaultColorOffset = new Float32Array(4);

    private isDefaultColorMatrix: boolean = true;

    constructor (config: IShaderConfig = {})
    {
        config.fragmentShader = config?.fragmentShader || MULTI_QUAD_FRAG;

        super(config);
    }

    create (fragmentShaderSource: string, vertexShaderSource: string, uniforms: {}, attribs: {}): void
    {
        const maxTextures = GetMaxTextures();

        fragmentShaderSource = fragmentShaderSource.replace(/%count%/gi, `${maxTextures}`);

        super.create(fragmentShaderSource, vertexShaderSource, uniforms, attribs);
    }

    bind (renderPass: IRenderPass): boolean
    {
        this.uniforms.set('uTexture', renderPass.textures.textureIndex);

        return super.bind(renderPass);
    }

    setColorMatrix (color: Color, renderPass: IRenderPass): void
    {
        if (color.useColorMatrix)
        {
            Flush(renderPass);

            this.setUniform('uColorMatrix', color.colorMatrix);
            this.setUniform('uColorOffset', color.colorOffset);

            this.isDefaultColorMatrix = false;
        }
        else if (!this.isDefaultColorMatrix)
        {
            Flush(renderPass);

            this.setUniform('uColorMatrix', this.defaultColorMatrix);
            this.setUniform('uColorOffset', this.defaultColorOffset);

            this.isDefaultColorMatrix = true;
        }
    }
}
