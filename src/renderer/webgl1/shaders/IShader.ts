import { IRenderPass } from '../renderpass/IRenderPass';
import { IShaderConfig } from './IShaderConfig';
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
    fromConfig (config: IShaderConfig): void;
    bind (renderPass: IRenderPass, uTexture?: number): boolean;
    create (fragmentShaderSource: string, vertexShaderSource: string, uniforms: Object, attribs: Object): void;
    destroy (): void;
    updateUniforms (renderPass: IRenderPass): void;
    setAttributes (renderPass: IRenderPass): void;
    setUniform (key: string, value: unknown): void;
    setUniforms (renderPass: IRenderPass): boolean;
}
