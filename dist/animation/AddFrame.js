import {CalculateDuration} from "./CalculateDuration";
import {LinkFrames} from "./LinkFrames";
export function AddFrame(animation, frame) {
  animation.frames.add(frame);
  CalculateDuration(animation, animation.frameRate);
  return LinkFrames(animation);
}
