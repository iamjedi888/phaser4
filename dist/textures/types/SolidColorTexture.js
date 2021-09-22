import { CreateCanvas } from "../CreateCanvas";
import { Texture } from "../Texture";
export function SolidColorTexture(color = "rgba(0,0,0,0)", width = 32, height = 32) {
  const ctx = CreateCanvas(width, height);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  return new Texture(ctx.canvas);
}
