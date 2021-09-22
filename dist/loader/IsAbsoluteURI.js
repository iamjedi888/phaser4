export function IsAbsoluteURI(url) {
  return /^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/.test(url);
}
