import { DeleteFramebuffer } from "../fbo/DeleteFramebuffer";
import { DeleteGLTexture } from "../textures/DeleteGLTexture";
import { DeleteShaders } from "./DeleteShaders";
export function DestroyShader(shader) {
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
