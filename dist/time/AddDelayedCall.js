import { AddTimer } from "./AddTimer";
export function AddDelayedCall(clock, delay, callback) {
  AddTimer(clock, {
    duration: 0,
    delay,
    onComplete: callback
  });
}
