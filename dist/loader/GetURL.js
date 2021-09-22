import { IsAbsoluteURI } from "./IsAbsoluteURI";
export function GetURL(key, url, extension, loader) {
  if (!url) {
    url = `${key}.${extension}`;
  }
  if (IsAbsoluteURI(url)) {
    return url;
  } else if (loader) {
    return `${loader.baseURL}${loader.path}${url}`;
  } else {
    return url;
  }
}
