import {File} from "../File";
import {GetURL} from "../GetURL";
import {ImageTagLoader} from "../ImageTagLoader";
import {SpriteSheetParser} from "../../textures/parsers/SpriteSheetParser";
import {TextureManagerInstance} from "../../textures/TextureManagerInstance";
export function SpriteSheetFile(key, url, frameConfig, glConfig) {
  const file = new File(key, url);
  file.load = () => {
    file.url = GetURL(file.key, file.url, ".png", file.loader);
    if (file.loader) {
      file.crossOrigin = file.loader.crossOrigin;
    }
    return new Promise((resolve, reject) => {
      const textureManager = TextureManagerInstance.get();
      if (textureManager.has(file.key)) {
        resolve(file);
      } else {
        ImageTagLoader(file).then((file2) => {
          const texture = textureManager.add(file2.key, file2.data, glConfig);
          if (texture) {
            SpriteSheetParser(texture, 0, 0, texture.width, texture.height, frameConfig);
            resolve(file2);
          } else {
            reject(file2);
          }
        }).catch((file2) => {
          reject(file2);
        });
      }
    });
  };
  return file;
}
