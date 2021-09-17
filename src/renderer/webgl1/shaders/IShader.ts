import { IRenderPass } from '../renderpass/IRenderPass';
import { IVertexAttribPointer } from './IVertexAttribPointer';
import { Texture } from '../../../textures/Texture';

export interface IShader
{
    attributes: Map<string, IVertexAttribPointer>;
    framebuffer: WebGLFramebuffer;
    program: WebGLProgram;
    renderToFramebuffer: boolean;
    renderToDepthbuffer: boolean;
    isActive: boolean;
    texture: Texture;
    uniforms: Map<string, unknown>;
    uniformSetters: Map<string, Function>;
    bind (renderPass: IRenderPass, uTexture?: number): boolean;
    updateUniforms (renderPass: IRenderPass): void;
}
