import { UpdateFrameUVs } from "./UpdateFrameUVs";
export function SetFrameSize(frame, width, height) {
  frame.width = width;
  frame.height = height;
  frame.sourceSizeWidth = width;
  frame.sourceSizeHeight = height;
  return UpdateFrameUVs(frame);
}
