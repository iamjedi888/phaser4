import {SetCanvasContext} from "./SetCanvasContext";
export function CanvasContext(contextAttributes) {
  return () => {
    SetCanvasContext(contextAttributes);
  };
}
