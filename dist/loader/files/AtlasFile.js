import { AtlasParser } from "../../textures/parsers/AtlasParser";
import { File } from "../File";
import { GetURL } from "../GetURL";
import { ImageFile } from "./ImageFile";
import { JSONFile } from "./JSONFile";
import { TextureManagerInstance } from "../../textures/TextureManagerInstance";
export function AtlasFile(key, textureURL, atlasURL, glConfig) {
  const json = JSONFile(key, atlasURL);
  const image = ImageFile(key, textureURL, glConfig);
  const file = new File(key, "");
  file.load = () => {
    json.url = GetURL(json.key, json.url, ".json", file.loader);
    image.url = GetURL(image.key, image.url, ".png", file.loader);
    return new Promise((resolve, reject) => {
      json.skipCache = true;
      json.load().then(() => {
        image.load().then(() => {
          AtlasParser(TextureManagerInstance.get().get(key), json.data);
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
