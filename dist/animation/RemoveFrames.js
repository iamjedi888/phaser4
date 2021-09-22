import { CalculateDuration } from "./CalculateDuration";
import { LinkFrames } from "./LinkFrames";
export function RemoveFrames(animation, ...frames) {
  frames.forEach((frame) => {
    animation.frames.delete(frame);
  });
  CalculateDuration(animation, animation.frameRate);
  return LinkFrames(animation);
}
