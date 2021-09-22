export function CreateFile(key, url, skipCache = false) {
  return {
    key,
    url,
    skipCache
  };
}
