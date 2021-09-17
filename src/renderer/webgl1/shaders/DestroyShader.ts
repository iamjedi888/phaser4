import { DeleteFramebuffer } from '../fbo/DeleteFramebuffer';
import { DeleteGLTexture } from '../textures/DeleteGLTexture';
import { DeleteShaders } from './DeleteShaders';
import { IShader } from './IShader';

export function DestroyShader <T extends IShader> (shader: T): void
{
    DeleteShaders(shader.program);
    DeleteGLTexture(shader.texture);
    DeleteFramebuffer(shader.framebuffer);

    shader.uniforms.clear();
    shader.uniformSetters.clear();
    shader.attributes.clear();

    shader.program = null;
    shader.texture = null;
    shader.framebuffer = null;
}
