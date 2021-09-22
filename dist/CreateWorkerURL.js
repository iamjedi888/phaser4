export function CreateWorkerURL(src) {
  const str = typeof src === "function" ? src.toString() : src;
  const blob = new Blob([`'use strict'; self.onmessage = ${str}`], { type: "text/javascript" });
  return window.URL.createObjectURL(blob);
}
