var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
export class AnimationFrame {
  constructor(texture, frame) {
    __publicField(this, "texture");
    __publicField(this, "frame");
    __publicField(this, "isFirst", false);
    __publicField(this, "isLast", false);
    __publicField(this, "isKeyFrame", false);
    __publicField(this, "nextFrame");
    __publicField(this, "prevFrame");
    __publicField(this, "duration", 0);
    __publicField(this, "progress", 0);
    this.texture = texture;
    this.frame = frame;
  }
  destroy() {
    this.texture = null;
    this.frame = null;
    this.nextFrame = null;
    this.prevFrame = null;
  }
}
