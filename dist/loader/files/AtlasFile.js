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
import { AtlasParser } from "../../textures/parsers/AtlasParser";
import { GetTexture } from "../../textures/GetTexture";
import { ImageFile } from "./ImageFile";
import { JSONFile } from "./JSONFile";
export function AtlasFile(key, textureURL, atlasURL, fileData = {}) {
  return (loader) => __async(this, null, function* () {
    try {
      const loadImage = ImageFile(key, textureURL, Object.assign({}, fileData, { skipCache: false }));
      const loadJSON = JSONFile(key, atlasURL, Object.assign({}, fileData, { skipCache: true }));
      const image = yield loadImage(loader);
      const json = yield loadJSON(loader);
      AtlasParser(GetTexture(key), json.data);
      return Promise.resolve(image);
    } catch (error) {
      return Promise.reject();
    }
  });
}
