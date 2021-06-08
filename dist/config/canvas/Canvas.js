import { CanvasRenderer } from "../../renderer/canvas/CanvasRenderer";
import { SetRenderer } from "../renderer/SetRenderer";
export function Canvas() {
  return () => {
    SetRenderer(CanvasRenderer);
  };
}
