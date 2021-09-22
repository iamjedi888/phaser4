import { gl } from "../GL";
export function DeleteGLBuffer(buffer) {
  if (gl.isBuffer(buffer)) {
    gl.deleteBuffer(buffer);
  }
}
