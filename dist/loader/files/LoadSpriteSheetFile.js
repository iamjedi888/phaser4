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
import { SpriteSheetFile } from "./SpriteSheetFile";
export function LoadSpriteSheetFile(_0, _1, _2) {
  return __async(this, arguments, function* (key, url, frameConfig, fileData = {}) {
    const load = SpriteSheetFile(key, url, frameConfig, fileData);
    return load();
  });
}
