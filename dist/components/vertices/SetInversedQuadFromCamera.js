import { SetQuadPosition } from "./SetQuadPosition";
export function SetInversedQuadFromCamera(id, camera, x, y, width, height) {
  const cx = camera.getBoundsX() + x;
  const cy = camera.getBoundsY() + y;
  SetQuadPosition(id, cx, cy + height, cx, cy, cx + width, cy, cx + width, cy + height);
}
