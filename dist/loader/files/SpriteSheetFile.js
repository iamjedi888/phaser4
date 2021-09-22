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
import { GetTexture } from "../../textures/GetTexture";
import { ImageFile } from "./ImageFile";
import { SpriteSheetParser } from "../../textures/parsers/SpriteSheetParser";
export function SpriteSheetFile(key, url, frameConfig, fileData = {}) {
  return (loader) => __async(this, null, function* () {
    try {
      const load = ImageFile(key, url, Object.assign({}, fileData, { skipCache: false }));
      const file = yield load(loader);
      const texture = GetTexture(key);
      if (texture) {
        SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);
      }
      return Promise.resolve(file);
    } catch (error) {
      return Promise.reject();
    }
  });
}
