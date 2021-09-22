export function GetEventNames(emitter) {
  return [...emitter.events.keys()];
}
