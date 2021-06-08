export function Emit(emitter, event, ...args) {
  if (emitter.events.size === 0 || !emitter.events.has(event)) {
    return false;
  }
  const listeners = emitter.events.get(event);
  const handlers = [...listeners];
  for (const ee of handlers) {
    ee.callback.apply(ee.context, args);
    if (ee.once) {
      listeners.delete(ee);
    }
  }
  if (listeners.size === 0) {
    emitter.events.delete(event);
  }
  return true;
}
