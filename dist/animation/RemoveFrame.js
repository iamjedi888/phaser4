import { CalculateDuration } from "./CalculateDuration";
import { LinkFrames } from "./LinkFrames";
export function RemoveFrame(animation, frame) {
  animation.frames.delete(frame);
  CalculateDuration(animation, animation.frameRate);
  return LinkFrames(animation);
}
