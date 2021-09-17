import { BindShader } from './BindShader';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { IShaderConfig } from './IShaderConfig';
import { IVertexAttribPointer } from './IVertexAttribPointer';
import { SetShaderFromConfig } from './SetShaderFromConfig';
import { Texture } from '../../../textures/Texture';

export class Shader implements IShader
{
    program: WebGLProgram;

    attributes: Map<string, IVertexAttribPointer>;

    uniforms: Map<string, unknown>;

    uniformSetters: Map<string, Function>;

    texture: Texture;

    framebuffer: WebGLFramebuffer;

    renderToFramebuffer: boolean = false;

    renderToDepthbuffer: boolean = false;

    isActive: boolean = false;

    constructor (config?: IShaderConfig)
    {
        if (config)
        {
            SetShaderFromConfig(this, config);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUniforms (renderPass: IRenderPass): void
    {
        //  Use this to set any extra uniform values prior to the bind
    }

    bind (renderPass: IRenderPass): boolean
    {
        return BindShader(this, renderPass);
    }
}
