var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { AlphaTexture } from "./AlphaTexture";
import { CreateCanvas } from "./CreateCanvas";
import { Texture } from "./Texture";
import { TextureManagerInstance } from "./TextureManagerInstance";
import { WhiteTexture } from "./WhiteTexture";
export class TextureManager {
  constructor() {
    __publicField(this, "textures");
    TextureManagerInstance.set(this);
    this.textures = new Map();
    this.createDefaultTextures();
  }
  createDefaultTextures() {
    const alphaTexture = this.add("__BLANK", new Texture(CreateCanvas(2, 2).canvas));
    AlphaTexture.set(alphaTexture);
    const missing = CreateCanvas(32, 32);
    missing.strokeStyle = "#0f0";
    missing.moveTo(0, 0);
    missing.lineTo(32, 32);
    missing.stroke();
    missing.strokeRect(0.5, 0.5, 31, 31);
    this.add("__MISSING", new Texture(missing.canvas));
    const white = CreateCanvas(2, 2);
    white.fillStyle = "#fff";
    white.fillRect(0, 0, 2, 2);
    const whiteTexture = this.add("__WHITE", new Texture(white.canvas));
    WhiteTexture.set(whiteTexture);
  }
  get(key) {
    const textures = this.textures;
    if (textures.has(key)) {
      return textures.get(key);
    } else {
      return textures.get("__MISSING");
    }
  }
  has(key) {
    return this.textures.has(key);
  }
  add(key, source, glConfig) {
    let texture;
    if (!this.textures.has(key)) {
      if (source instanceof Texture) {
        texture = source;
      } else {
        texture = new Texture(source, 0, 0, glConfig);
      }
      texture.key = key;
      this.textures.set(key, texture);
    }
    return texture;
  }
  update(key, source, glConfig) {
    const texture = this.textures.get(key);
    if (texture) {
      texture.update(source, glConfig);
    }
    return texture;
  }
}
