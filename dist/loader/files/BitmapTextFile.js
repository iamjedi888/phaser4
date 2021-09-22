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
import { BitmapTextParser } from "../../textures/parsers/BitmapTextParser";
import { GetTexture } from "../../textures/GetTexture";
import { ImageFile } from "./ImageFile";
import { XMLFile } from "./XMLFile";
export function BitmapTextFile(key, textureURL, fontDataURL, fileData = {}) {
  return (loader) => __async(this, null, function* () {
    try {
      const loadImage = ImageFile(key, textureURL, Object.assign({}, fileData, { skipCache: false }));
      const loadXML = XMLFile(key, fontDataURL, Object.assign({}, fileData, { skipCache: true }));
      const image = yield loadImage(loader);
      const xml = yield loadXML(loader);
      const texture = GetTexture(key);
      const fontData = BitmapTextParser(texture, xml.data);
      texture.data = fontData;
      return Promise.resolve(image);
    } catch (error) {
      return Promise.reject();
    }
  });
}
