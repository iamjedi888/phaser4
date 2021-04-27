import {CreateCanvas} from "../CreateCanvas";
import {Texture} from "../Texture";
export function GridTexture(color1, color2, width = 32, height = 32, cols = 2, rows = 2) {
  const ctx = CreateCanvas(width, height);
  const colWidth = width / cols;
  const rowHeight = height / rows;
  ctx.fillStyle = color1;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = color2;
  for (let y = 0; y < rows; y++) {
    for (let x = y % 2; x < cols; x += 2) {
      ctx.fillRect(x * colWidth, y * rowHeight, colWidth, rowHeight);
    }
  }
  return new Texture(ctx.canvas);
}
