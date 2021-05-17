import {GetTexture} from "./GetTexture";
export function GetFrames(texture, frames) {
  if (typeof texture === "string") {
    texture = GetTexture(texture);
  }
  const output = [];
  for (const frame of texture.frames.values()) {
    if (frame.key === "__BASE" && texture.frames.size > 1) {
      continue;
    }
    if (!frames || frames.indexOf(frame.key) !== -1) {
      output.push(frame);
    }
  }
  return output;
}
