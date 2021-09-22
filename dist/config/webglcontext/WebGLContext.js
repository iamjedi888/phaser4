import { SetWebGLContext } from "./SetWebGLContext";
export function WebGLContext(contextAttributes) {
  return () => {
    SetWebGLContext(contextAttributes);
  };
}
