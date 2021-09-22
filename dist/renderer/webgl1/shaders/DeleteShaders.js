import { gl } from "../GL";
export function DeleteShaders(...shaders) {
  shaders.forEach((shader) => {
    gl.deleteShader(shader);
  });
}
