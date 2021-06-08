var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class EventInstance {
  constructor(callback, context, once = false) {
    __publicField(this, "callback");
    __publicField(this, "context");
    __publicField(this, "once");
    this.callback = callback;
    this.context = context;
    this.once = once;
  }
}
