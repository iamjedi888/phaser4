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
export function LoadAtlasFile(_0, _1, _2) {
  return __async(this, arguments, function* (key, textureURL, atlasURL, fileData = {}) {
    const load = AtlasFile(key, textureURL, atlasURL, fileData);
    return load();
  });
}
