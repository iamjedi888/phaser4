var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class File {
  constructor(key, url, config) {
    __publicField(this, "key");
    __publicField(this, "url");
    __publicField(this, "responseType", "text");
    __publicField(this, "crossOrigin");
    __publicField(this, "data");
    __publicField(this, "error");
    __publicField(this, "config");
    __publicField(this, "skipCache", false);
    __publicField(this, "hasLoaded", false);
    __publicField(this, "loader");
    __publicField(this, "load");
    this.key = key;
    this.url = url;
    this.config = config;
  }
}
