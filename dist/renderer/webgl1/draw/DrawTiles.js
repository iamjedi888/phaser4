import { DrawFrame } from "./DrawFrame";
export function DrawTiles(renderPass, texture, tileWidth, tileHeight, mapData, mapWidth, x = 0, y = 0, alpha = 1) {
  let tx = 0;
  let ty = 0;
  let i = 0;
  mapData.forEach((tile) => {
    if (tile !== -1) {
      DrawFrame(renderPass, texture, tile, Math.floor(x + tx), Math.floor(y + ty), alpha);
    }
    i++;
    tx += tileWidth;
    if (i === mapWidth) {
      tx = 0;
      ty += tileHeight;
      i = 0;
    }
  });
}
