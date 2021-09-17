import { IRectangle } from '../../../geom/rectangle/IRectangle';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IVertexAttribPointer } from './IVertexAttribPointer';
import { Texture } from '../../../textures/Texture';

export interface IShader
{
    attributes: Map<string, IVertexAttribPointer>;
    framebuffer: WebGLFramebuffer;
    isActive: boolean;
    program: WebGLProgram;
    renderToDepthbuffer: boolean;
    renderToFramebuffer: boolean;
    texture: Texture;
    uniforms: Map<string, unknown>;
    uniformSetters: Map<string, Function>;
    viewport?: IRectangle;

    bind (renderPass: IRenderPass, uTexture?: number): boolean;

    updateUniforms (renderPass: IRenderPass): void;
}
