import { SetRenderer } from "../renderer/SetRenderer";
import { WebGLRenderer } from "../../renderer/webgl1/WebGLRenderer";
export function WebGL() {
  return () => {
    SetRenderer(WebGLRenderer);
  };
}
