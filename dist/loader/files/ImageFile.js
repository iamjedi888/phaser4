import {File} from "../File";
import {GetURL} from "../GetURL";
import {ImageTagLoader} from "../ImageTagLoader";
import {TextureManagerInstance} from "../../textures/TextureManagerInstance";
export function ImageFile(key, url, glConfig) {
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
          textureManager.add(file2.key, file2.data, glConfig);
          resolve(file2);
        }).catch((file2) => {
          reject(file2);
        });
      }
    });
  };
  return file;
}
