var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { GetBufferFromVertexSet } from "./GetBufferFromVertexSet";
export class Geometry {
  constructor(data) {
    __publicField(this, "buffer");
    if (data) {
      if (data.hasOwnProperty("vertices")) {
        this.buffer = GetBufferFromVertexSet(data);
      } else {
        this.buffer = data;
      }
    }
  }
  destroy() {
    this.buffer.destroy();
  }
}
