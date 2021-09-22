import { SetFramePivot } from "../SetFramePivot";
import { SetFrameSourceSize } from "../SetFrameSourceSize";
import { SetFrameTrim } from "../SetFrameTrim";
export function AtlasParser(texture, data) {
  let frames;
  if (Array.isArray(data.textures)) {
    frames = data.textures[0].frames;
  } else if (Array.isArray(data.frames)) {
    frames = data.frames;
  } else if (data.hasOwnProperty("frames")) {
    frames = [];
    for (const [filename, frame] of Object.entries(data.frames)) {
      frame["filename"] = filename;
      frames.push(frame);
    }
  } else {
    console.warn("Invalid Texture Atlas JSON");
  }
  if (frames) {
    let newFrame;
    for (let i = 0; i < frames.length; i++) {
      const src = frames[i];
      newFrame = texture.addFrame(src.filename, src.frame.x, src.frame.y, src.frame.w, src.frame.h);
      if (src.trimmed) {
        SetFrameTrim(newFrame, src.sourceSize.w, src.sourceSize.h, src.spriteSourceSize.x, src.spriteSourceSize.y, src.spriteSourceSize.w, src.spriteSourceSize.h);
      } else {
        SetFrameSourceSize(newFrame, src.sourceSize.w, src.sourceSize.h);
      }
      if (src.rotated) {
      }
      if (src.anchor) {
        SetFramePivot(newFrame, src.anchor.x, src.anchor.y);
      }
    }
  }
}
