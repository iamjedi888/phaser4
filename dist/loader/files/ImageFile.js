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
import { CreateFile } from "../CreateFile";
import { GetURL } from "../GetURL";
import { RequestFile } from "../RequestFile";
import { TextureManagerInstance } from "../../textures/TextureManagerInstance";
export function ImageFile(key, url, fileData = {}) {
  return (loader) => {
    const file = CreateFile(key, GetURL(key, url, "png", loader), fileData == null ? void 0 : fileData.skipCache);
    const textureManager = TextureManagerInstance.get();
    const preload = () => {
      return textureManager && (!textureManager.has(key) || !textureManager.get(key).locked);
    };
    const onload = (file2) => __async(this, null, function* () {
      const blob = yield file2.response.blob();
      let image;
      if (window && "createImageBitmap" in window && !(fileData == null ? void 0 : fileData.getImage)) {
        image = yield createImageBitmap(blob);
      } else {
        image = yield new Promise((resolve, reject) => {
          const url2 = URL.createObjectURL(blob);
          const img = new Image();
          img.onload = () => {
            URL.revokeObjectURL(url2);
            resolve(img);
          };
          img.onerror = () => {
            reject();
          };
          img.src = url2;
          if (img.complete && img.width && img.height) {
            img.onload = null;
            img.onerror = null;
            resolve(img);
          }
        });
      }
      if (!image) {
        return false;
      }
      if (fileData.skipCache) {
        file2.data = image;
      } else if (textureManager.has(key)) {
        file2.data = textureManager.update(key, image, fileData == null ? void 0 : fileData.glConfig);
      } else {
        file2.data = textureManager.add(key, image, fileData == null ? void 0 : fileData.glConfig);
      }
      return true;
    });
    return RequestFile(file, preload, onload, fileData);
  };
}
