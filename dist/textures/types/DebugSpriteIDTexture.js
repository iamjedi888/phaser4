import { CreateCanvas } from "../CreateCanvas";
import { SpriteSheetParser } from "../parsers/SpriteSheetParser";
import { Texture } from "../Texture";
export function DebugSpriteIDTexture(cellWidth = 32, cellHeight = 32, cols = 32, rows = 32) {
  const ctx = CreateCanvas(cellWidth * cols, cellHeight * rows);
  const colors = [
    "#e27458",
    "#e89361",
    "#f0b26b",
    "#fff57e",
    "#b4d27e",
    "#8dc37e",
    "#62b57e",
    "#58b8b3",
    "#44bced",
    "#568ac5",
    "#5c73b4",
    "#605ca3",
    "#8061a4",
    "#9e67a5",
    "#e076a8",
    "#e1757f"
  ];
  let colorIndex = 0;
  let cell = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = colors[colorIndex];
      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x * cellWidth + 0.5, y * cellHeight + 0.5, cellWidth - 1, cellHeight - 1);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.textAlign = "center";
      ctx.font = "12px monospace";
      ctx.fillText(`${cell}`, x * cellWidth + cellWidth / 2, y * cellHeight + 20);
      cell++;
      colorIndex++;
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }
    }
  }
  const texture = new Texture(ctx.canvas);
  SpriteSheetParser(texture, 0, 0, cellWidth * cols, cellHeight * rows, { frameWidth: cellWidth, frameHeight: cellHeight });
  return texture;
}
