var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { AtlasFile } from "./AtlasFile";
import { AtlasParser } from "../../textures/parsers/AtlasParser";
import { BinaryFile } from "./BinaryFile";
import { GetCompressedTextureName } from "../../renderer/webgl1/textures/GetCompressedTextureName";
import { ImageFile } from "./ImageFile";
import { JSONFile } from "./JSONFile";
import { KTXParser } from "../../textures/parsers/KTXParser";
import { PVRParser } from "../../textures/parsers/PVRParser";
import { ProcessBindingQueue } from "../../renderer/webgl1/renderpass/ProcessBindingQueue";
import { SupportsCompressedTexture } from "../../renderer/webgl1/textures/SupportsCompressedTexture";
import { Texture } from "../../textures/Texture";
import { TextureManagerInstance } from "../../textures/TextureManagerInstance";
export function TextureFile(key, urls, fileData = {}) {
  if (!fileData.glConfig) {
    fileData.glConfig = {};
  }
  const entry = {
    format: null,
    type: null,
    textureURL: null,
    atlasURL: null
  };
  for (const textureBaseFormat in urls) {
    if (SupportsCompressedTexture(textureBaseFormat)) {
      const urlEntry = urls[textureBaseFormat];
      if (typeof urlEntry === "string") {
        entry.textureURL = urlEntry;
      } else {
        Object.assign(entry, urlEntry);
      }
      entry.format = textureBaseFormat.toUpperCase();
      break;
    }
  }
  if (!entry) {
    console.warn(`TextureFile: ${key} = No supported format or IMG fallback`);
    return;
  }
  if (entry.format === "IMG") {
    if (entry.atlasURL) {
      return AtlasFile(key, entry.textureURL, entry.atlasURL, fileData);
    } else {
      return ImageFile(key, entry.textureURL, fileData);
    }
  }
  return (loader) => __async(this, null, function* () {
    try {
      const loadImage = BinaryFile(key, entry.textureURL, Object.assign({}, fileData, { skipCache: true }));
      const image = yield loadImage(loader);
      let json;
      if (entry.atlasURL) {
        const loadJSON = JSONFile(key, entry.atlasURL, Object.assign({}, fileData, { skipCache: true }));
        json = yield loadJSON(loader);
      }
      if (!entry.type) {
        entry.type = image.url.endsWith(".ktx") ? "KTX" : "PVR";
      }
      let textureData;
      if (entry.type === "PVR") {
        textureData = PVRParser(image.data);
      } else if (entry.type === "KTX") {
        textureData = KTXParser(image.data);
      }
      if (textureData && SupportsCompressedTexture(entry.format, textureData.internalFormat)) {
        textureData.format = GetCompressedTextureName(entry.format, textureData.internalFormat);
        const texture = new Texture(null, textureData.width, textureData.height, Object.assign(fileData.glConfig, textureData));
        const textureManager = TextureManagerInstance.get();
        textureManager.add(key, texture);
        ProcessBindingQueue();
        if (json && json.data) {
          AtlasParser(texture, json.data);
        }
        return Promise.resolve(image);
      } else {
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject();
    }
  });
}
