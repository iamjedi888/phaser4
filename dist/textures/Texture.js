var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { BindingQueue } from "../renderer/BindingQueue";
import { Frame } from "./Frame";
export class Texture {
  constructor(image, width, height, glConfig) {
    __publicField(this, "key", "");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "image");
    __publicField(this, "binding");
    __publicField(this, "firstFrame");
    __publicField(this, "frames");
    __publicField(this, "data");
    if (image) {
      width = image.width;
      height = image.height;
    }
    this.image = image;
    this.width = width;
    this.height = height;
    this.frames = new Map();
    this.data = {};
    this.addFrame("__BASE", 0, 0, width, height);
    BindingQueue.add(this, glConfig);
  }
  addFrame(key, x, y, width, height) {
    if (this.frames.has(key)) {
      return null;
    }
    const frame = new Frame(this, key, x, y, width, height);
    this.frames.set(key, frame);
    if (!this.firstFrame || this.firstFrame.key === "__BASE") {
      this.firstFrame = frame;
    }
    return frame;
  }
  getFrame(key) {
    if (!key) {
      return this.firstFrame;
    }
    if (key instanceof Frame) {
      key = key.key;
    }
    let frame = this.frames.get(key);
    if (!frame) {
      console.warn(`Frame missing: ${key}`);
      frame = this.firstFrame;
    }
    return frame;
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    const frame = this.frames.get("__BASE");
    frame.setSize(width, height);
  }
  destroy() {
    if (this.binding) {
      this.binding.destroy();
    }
    this.frames.clear();
    this.data = null;
    this.image = null;
    this.firstFrame = null;
  }
}
