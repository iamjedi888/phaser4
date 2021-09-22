export function GetListeners(emitter, event) {
  const out = [];
  const listeners = emitter.events.get(event);
  listeners.forEach((listener) => {
    out.push(listener.callback);
  });
  return out;
}
