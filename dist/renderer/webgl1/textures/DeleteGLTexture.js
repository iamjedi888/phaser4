import { gl } from "../GL";
export function DeleteGLTexture(texture) {
  if (gl.isTexture(texture)) {
    gl.deleteTexture(texture);
  }
}
