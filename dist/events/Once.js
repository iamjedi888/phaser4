import {On} from "./On";
export function Once(emitter, event, callback, context = emitter) {
  return On(emitter, event, callback, context, true);
}
