import {NanoTween} from "./NanoTween";
export function AddTween(target, emitter = null, autoStart = true) {
  return new NanoTween(target, emitter, autoStart);
}
