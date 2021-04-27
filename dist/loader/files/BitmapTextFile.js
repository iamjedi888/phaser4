import {BitmapTextParser} from "../../textures/parsers/BitmapTextParser";
import {File} from "../File";
import {GetURL} from "../GetURL";
import {ImageFile} from "./ImageFile";
import {TextureManagerInstance} from "../../textures/TextureManagerInstance";
import {XMLFile} from "./XMLFile";
export function BitmapTextFile(key, textureURL, fontDataURL, glConfig) {
  const xml = XMLFile(key, fontDataURL);
  const image = ImageFile(key, textureURL, glConfig);
  const file = new File(key, "");
  file.load = () => {
    xml.url = GetURL(xml.key, xml.url, ".xml", file.loader);
    image.url = GetURL(image.key, image.url, ".png", file.loader);
    return new Promise((resolve, reject) => {
      xml.skipCache = true;
      xml.load().then(() => {
        image.load().then(() => {
          const texture = TextureManagerInstance.get().get(key);
          const fontData = BitmapTextParser(texture, xml.data);
          texture.data = fontData;
          resolve(file);
        }).catch(() => {
          reject(file);
        });
      }).catch(() => {
        reject(file);
      });
    });
  };
  return file;
}
