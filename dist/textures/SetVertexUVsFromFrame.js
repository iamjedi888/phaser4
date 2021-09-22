import { SetUV } from "../components/vertices/SetUV";
export function SetVertexUVsFromFrame(id, frame) {
  SetUV(id, frame.u0, frame.v0, frame.u1, frame.v1);
  return frame;
}
