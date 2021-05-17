import {CalculateDuration} from "./CalculateDuration";
import {LinkFrames} from "./LinkFrames";
export function AddFrames(animation, ...frames) {
  frames.forEach((frame) => {
    animation.frames.add(frame);
  });
  CalculateDuration(animation, animation.frameRate);
  return LinkFrames(animation);
}
