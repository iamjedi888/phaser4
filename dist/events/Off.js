import {EventInstance} from "./EventInstance";
export function Off(emitter, event, callback, context, once) {
  const events = emitter.events;
  const listeners = events.get(event);
  if (!callback) {
    events.delete(event);
  } else if (callback instanceof EventInstance) {
    listeners.delete(callback);
  } else {
    const hasContext = !context;
    const hasOnce = once !== void 0;
    for (const listener of listeners) {
      if (listener.callback === callback && (hasContext && listener.context === context) && (hasOnce && listener.once === once)) {
        listeners.delete(listener);
      }
    }
  }
  if (listeners.size === 0) {
    events.delete(event);
  }
  return emitter;
}
