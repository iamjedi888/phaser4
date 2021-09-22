var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { UpdateFrameUVs } from "./UpdateFrameUVs";
export class Frame {
  constructor(texture, key, x, y, width, height) {
    __publicField(this, "texture");
    __publicField(this, "key");
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "trimmed", false);
    __publicField(this, "sourceSizeWidth");
    __publicField(this, "sourceSizeHeight");
    __publicField(this, "spriteSourceSizeX");
    __publicField(this, "spriteSourceSizeY");
    __publicField(this, "spriteSourceSizeWidth");
    __publicField(this, "spriteSourceSizeHeight");
    __publicField(this, "pivot");
    __publicField(this, "u0");
    __publicField(this, "v0");
    __publicField(this, "u1");
    __publicField(this, "v1");
    this.texture = texture;
    this.key = key;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    UpdateFrameUVs(this);
  }
  destroy() {
    this.texture = null;
  }
}
