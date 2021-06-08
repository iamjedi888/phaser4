var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { QuadVertexComponent } from "../components/vertices/QuadVertexComponent";
import { SetExtent } from "../components/transform/SetExtent";
import { SetUV } from "../components/vertices/SetUV";
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
    this.updateUVs();
  }
  setPivot(x, y) {
    this.pivot = { x, y };
  }
  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    this.updateUVs();
  }
  setSourceSize(width, height) {
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
  }
  setTrim(width, height, x, y, w, h) {
    this.trimmed = true;
    this.sourceSizeWidth = width;
    this.sourceSizeHeight = height;
    this.spriteSourceSizeX = x;
    this.spriteSourceSizeY = y;
    this.spriteSourceSizeWidth = w;
    this.spriteSourceSizeHeight = h;
  }
  getExtent(originX, originY) {
    const sourceSizeWidth = this.sourceSizeWidth;
    const sourceSizeHeight = this.sourceSizeHeight;
    let left;
    let right;
    let top;
    let bottom;
    if (this.trimmed) {
      left = this.spriteSourceSizeX - originX * sourceSizeWidth;
      right = left + this.spriteSourceSizeWidth;
      top = this.spriteSourceSizeY - originY * sourceSizeHeight;
      bottom = top + this.spriteSourceSizeHeight;
    } else {
      left = -originX * sourceSizeWidth;
      right = left + sourceSizeWidth;
      top = -originY * sourceSizeHeight;
      bottom = top + sourceSizeHeight;
    }
    return { left, right, top, bottom };
  }
  copyToExtent(child) {
    const originX = child.originX;
    const originY = child.originY;
    const sourceSizeWidth = this.sourceSizeWidth;
    const sourceSizeHeight = this.sourceSizeHeight;
    let x;
    let y;
    let width;
    let height;
    if (this.trimmed) {
      x = this.spriteSourceSizeX - originX * sourceSizeWidth;
      y = this.spriteSourceSizeY - originY * sourceSizeHeight;
      width = this.spriteSourceSizeWidth;
      height = this.spriteSourceSizeHeight;
    } else {
      x = -originX * sourceSizeWidth;
      y = -originY * sourceSizeHeight;
      width = sourceSizeWidth;
      height = sourceSizeHeight;
    }
    SetExtent(child.id, x, y, width, height);
    return this;
  }
  copyToVertices(id) {
    const { u0, u1, v0, v1 } = this;
    SetUV(QuadVertexComponent.v1[id], u0, v0);
    SetUV(QuadVertexComponent.v2[id], u0, v1);
    SetUV(QuadVertexComponent.v3[id], u1, v1);
    SetUV(QuadVertexComponent.v4[id], u1, v0);
    return this;
  }
  updateUVs() {
    const { x, y, width, height } = this;
    const baseTextureWidth = this.texture.width;
    const baseTextureHeight = this.texture.height;
    this.u0 = x / baseTextureWidth;
    this.v0 = y / baseTextureHeight;
    this.u1 = (x + width) / baseTextureWidth;
    this.v1 = (y + height) / baseTextureHeight;
  }
  destroy() {
    this.texture = null;
  }
}
