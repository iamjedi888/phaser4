export function GetListenerCount(emitter, event) {
  const listeners = emitter.events.get(event);
  return listeners ? listeners.size : 0;
}
