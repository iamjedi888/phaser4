import { IRectangle } from '../../../geom/rectangle/IRectangle';
import { IRenderPass } from '../renderpass/IRenderPass';
import { IShader } from './IShader';
import { IShaderConfig } from './IShaderConfig';
import { IVertexAttribPointer } from './IVertexAttribPointer';
import { Texture } from '../../../textures/Texture';
export declare class Shader implements IShader {
    program: WebGLProgram;
    attributes: Map<string, IVertexAttribPointer>;
    uniforms: Map<string, unknown>;
    uniformSetters: Map<string, Function>;
    texture: Texture;
    framebuffer: WebGLFramebuffer;
    renderToFramebuffer: boolean;
    renderToDepthbuffer: boolean;
    isActive: boolean;
    viewport?: IRectangle;
    constructor(config?: IShaderConfig);
    updateUniforms(renderPass: IRenderPass): void;
    bind(renderPass: IRenderPass): boolean;
}
//# sourceMappingURL=Shader.d.ts.map